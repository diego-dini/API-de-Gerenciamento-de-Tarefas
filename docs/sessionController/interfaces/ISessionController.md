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

[src/sessionController.ts:29](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/af5f928f65b5a1b1f01ef851e3d416d5eeef8bc1/src/sessionController.ts#L29)

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

[src/sessionController.ts:36](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/af5f928f65b5a1b1f01ef851e3d416d5eeef8bc1/src/sessionController.ts#L36)

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

[src/sessionController.ts:43](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/af5f928f65b5a1b1f01ef851e3d416d5eeef8bc1/src/sessionController.ts#L43)
