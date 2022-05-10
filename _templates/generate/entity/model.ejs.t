---
to: <%= h.dir(name) %>/<% h.name(name, true) %>.model.ts
---

import {Schema} from "mongoose";
import { Basemodel } from "<%= h.importPath(name, "src/base/baseModel") %>";
import { Mongo } from "<%= h.importPath(name, "src/helpers/mongo") %>;

const <%= h.name(name) %>Schema = new Schema({}, {timestamps: true})

export const <%= h.name(name) %>Model = Mongo.model<%= h.name(name) %>("<%= h.name(name) %>", <%= h.name(name, true) %>Schema);