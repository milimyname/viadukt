/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./lucia.js").Auth;
  type DatabaseUserAttributes = {
    username: string;
    avatar_url: string;
  };
  type DatabaseSessionAttributes = {};
}
