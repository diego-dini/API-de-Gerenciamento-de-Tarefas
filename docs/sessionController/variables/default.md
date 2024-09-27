[**com.docker.devenvironments.code v1.0.0**](../../README.md) • **Docs**

***

[com.docker.devenvironments.code v1.0.0](../../README.md) / [sessionController](../README.md) / default

# Variable: default

> `const` **default**: `object`

## Type declaration

### login()

Handles user login by verifying credentials and creating a session.
The login is successful if the user's password hash matches the stored hash.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object containing login and password.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object for sending the login status.

#### Returns

`Response`\<`any`, `Record`\<`string`, `any`\>\>

### logout()

Logs the user out by destroying their session.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object for sending the logout status.

#### Returns

`void`

### validSession()

Checks if the session is valid by verifying if a user is logged in.
Extends the session timeout by calling `touch()` on the session.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object.

#### Returns

`boolean`

true if the session is valid, false otherwise.

## Defined in

[sessionController.ts:18](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/97f461cf7047b749ac664a9b903c45f556eaccb0/src/sessionController.ts#L18)
