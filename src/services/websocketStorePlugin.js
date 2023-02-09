/* eslint-disable no-param-reassign */
export default function createWebSocketPlugin(socket) {
	return (store) => {
		store.$socket = socket;
	};
}

/*
user: register;
user: login;
news: list;
news: create;
news: view;
comment: add;

user:register:error
user:register:success
user:login:error
user:login:success

news:create:error
news:create:success
news:view:error
news:view:success
news:list:error
news:list:success

comment:create:error
comment:create:success

res message
  Invalid Token
  Invalid credentials
  Missing Token
  News not found
  Something went wrong
  User not found
  News not found
  Email already in use
*/
