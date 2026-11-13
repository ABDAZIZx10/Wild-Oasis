// scripts/enable-proxy.mjs
import { ProxyAgent, setGlobalDispatcher } from "undici";
setGlobalDispatcher(new ProxyAgent("http://127.0.0.1:1091"));