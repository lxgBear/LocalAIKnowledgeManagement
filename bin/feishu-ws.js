#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const Lark = require("@larksuiteoapi/node-sdk");

const repo = path.resolve(__dirname, "..");
const credPath = path.join(repo, "90-敏感", "凭据-飞书应用.md");
const logPath = path.join(repo, "90-敏感", "飞书-长连接.log");

function credential(label) {
  const text = fs.readFileSync(credPath, "utf8");
  const re = new RegExp("## " + label + "\\s+```\\s*([^\\s`]+)");
  const match = text.match(re);
  if (!match) throw new Error("missing " + label + " in " + credPath);
  return match[1];
}

function record(event) {
  const message = event.message || {};
  const line = JSON.stringify({
    at: new Date().toISOString(),
    chat_type: message.chat_type,
    message_id: message.message_id,
    msg_type: message.message_type,
    create_time: message.create_time,
  });
  fs.appendFileSync(logPath, line + "\n");
}

const wsClient = new Lark.WSClient({
  appId: credential("App ID"),
  appSecret: credential("App Secret"),
  loggerLevel: Lark.LoggerLevel.info,
});

wsClient.start({
  eventDispatcher: new Lark.EventDispatcher({}).register({
    "im.message.receive_v1": async (data) => record(data),
  }),
});
