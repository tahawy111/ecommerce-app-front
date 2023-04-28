/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    GOOGLE_ID:
      "93804304731-hib75m25vrndp62uhdi5ir0ehi9q7144.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
    MONGODB_URI:
      "mongodb+srv://admin:amer123456@cluster0.fz2cxpc.mongodb.net/ecommerce-app?retryWrites=true&w=majority",
    NEXTAUTH_SECRET:
      "#XZ%}tV%lTca6(;Jd?+T>y(#+oPvrsp<V|Fe^lipO<Df&R!~I2pgb*ze8?smCpY",
    CURRENCY: "USD",
    NEXTAUTH_URL: "https://localhost:3000",
    SIGNIN_SECRET:
      "ES!&hVT=g!D6VRUr<v3gZb@%e6;@ak$(y<ARV-!m3}2=u)eyN,[JkA?q~srvxzn^",
    ACTIVE_TOKEN_SECRET:
      "%6zT<fgY!%E*&SEJC<~Q<vmvft4v%;b>hw9x@d`)p{{rhESt.!Sb%H@[EY;u$mVR",
    ACCESS_TOKEN_SECRET:
      "jME<cpk\\#Q:nLg'_>uzf)xNmxK>DT@t3HmsWT+gYzR!ZzN4dd9)RpXGw3`p'PF<J",
    REFRESH_TOKEN_SECRET:
      "H8TRsUa*uVL*&AL+@nXU4fMS9Hj<~Qr*~?jy.,p*&ShSCq8$p.}a.q8yt^d_N%7h",
      PAYPAL_CLIENT_ID: "ATpWaUL343-J4tlGbFemr1OyLAMxI-ucOldqZvYcsAJtzAq1l_ORH2C37OoivyjxH7dplRe7qufhhyC2"
  },
};

module.exports = nextConfig;
