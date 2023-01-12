import jwt from "jsonwebtoken";
import  UserSchema  from "../../routes/user/schema";

const authenticate = async (user: any): Promise<{ token: string, refreshToken: string }> => {
  try {
    const newAccessToken = await generateJWT({ _id: user._id });
    const refreshToken = await generateRefreshToken({ _id: user._id });

    user.refreshTokens = user.refreshTokens.concat({ token: refreshToken });
    await user.save();

    return { token: newAccessToken, refreshToken };
  } catch (error:any) {
    console.log(error);
    throw new Error(error);
  }
};

const generateJWT = (payload: object): Promise<string> =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
      (error, token:any) => {
        if (error) rej(error);
        res(token);
      }
    )
  );

const verifyJWT = (token: string): Promise<object> =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET!, (error, decoded:any) => {
      if (error) rej(error);
      res(decoded);
    })
  );

const generateRefreshToken = (payload: object): Promise<string> =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1 week" },
      (err, token:any) => {
        if (err) rej(err);
        res(token);
      }
    )
  );

const verifyRefreshToken = (token: string): Promise<object> =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err, decoded:any) => {
      if (err) rej(err);
      res(decoded);
    })
  );

const refresh = async (oldRefreshToken:string) => {
  try {
    const decoded:any = await verifyRefreshToken(oldRefreshToken);

    const user:any = await UserSchema.findOne({ _id: decoded._id });

    const currentRefreshToken = user!.refreshTokens.find(
      (token: { token: string; }) => token.token === oldRefreshToken
    );

    if (!currentRefreshToken) {
      throw new Error("Bad refresh token provided!");
    }

    const newAccessToken = await generateJWT({ _id: user._id });
    const newRefreshToken = await generateRefreshToken({ _id: user._id });

    const newRefreshTokensList = user.refreshTokens
      .filter((token:any) => token.token !== oldRefreshToken)
      .concat({ token: newRefreshToken });

    user.refreshTokens = [...newRefreshTokensList];
    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.log(error);
  }
};

export { authenticate, verifyJWT, refresh };