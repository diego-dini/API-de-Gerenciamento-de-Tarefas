[**com.docker.devenvironments.code v1.0.0**](../../README.md) • **Docs**

***

[com.docker.devenvironments.code v1.0.0](../../README.md) / [sessionController](../README.md) / ISessionController

# Interface: ISessionController

Interface for the Session Controller.

## Methods

### login()

> **login**(`req`, `res`): `void`

Handles user login by verifying credentials and creating a session.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object containing login and password.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object for sending the login status.

#### Returns

`void`

#### Defined in

[sessionController.ts:26](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/sessionController.ts#L26)

***

### logout()

> **logout**(`req`, `res`): `void`

Logs the user out by destroying their session.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object for sending the logout status.

#### Returns

`void`

#### Defined in

[sessionController.ts:33](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/sessionController.ts#L33)

***

### validSession()

> **validSession**(`req`): `boolean`

Checks if the session is valid by verifying if a user is logged in.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object.

#### Returns

`boolean`

true if the session is valid, false otherwise.

#### Defined in

[sessionController.ts:40](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/sessionController.ts#L40)
