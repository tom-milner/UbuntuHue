import axios from "axios";

// Fill in info here
const BRIDGE_IP = "192.168.1.174";
const USER = "o2ss4K7TRNDtvk6CD9NI7wVaU5FGzvTAW8XEbK7e";
//////////////////////////////////////////////////////////

export default () => {
  let API = `http://${BRIDGE_IP}/api/${USER}/`;
  return axios.create({
    baseURL: API
  });
};
