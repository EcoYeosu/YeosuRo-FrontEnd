import axios from "axios";
import { getSession } from "@auth0/nextjs-auth0";

export default async function getGapiToken() {
  // const { user } = await getSession();
  //
  // const config = {
  //   client_id: process.env.AUTH0_CLIENT_ID,
  //   client_secret: process.env.AUTH0_CLIENT_SECRET,
  //   audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
  //   grant_type: "client_credentials",
  // };
  //
  // const token = await axios.post(
  //   `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
  //   config,
  //   {
  //     headers: { "content-type": "application/json" },
  //   }
  // );
  //
  // const response = await axios.get(
  //   `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}`,
  //   {
  //     headers: { authorization: `Bearer ${token.data.access_token}` },
  //   }
  // );
  //
  // return response.data.identities[0].access_token;
  return "";
}
