import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const instance = axios.create({
  baseURL: "https://www.worldcoinindex.com/apiservice/",
});

instance.defaults.params = {
  key: "27vvQtlktZDhVZbWXoHSZz7n77PcSkXPpz8",
};

export default instance;
