import test from "node:test";import assert from "node:assert/strict";import{jsonToEnv}from"../src/index.js";
test("flattens values",()=>assert.equal(jsonToEnv({db:{host:"localhost",port:5432}}),"DB_HOST=localhost\nDB_PORT=5432"));
test("quotes spaced values",()=>assert.equal(jsonToEnv({message:"hello world"}),'MESSAGE="hello world"'));
test("supports lowercase",()=>assert.equal(jsonToEnv({a:{b:1}},{uppercase:false}),"a_b=1"));
