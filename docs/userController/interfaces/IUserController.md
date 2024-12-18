[**com.docker.devenvironments.code v1.0.0**](../../README.md) • **Docs**

***

[com.docker.devenvironments.code v1.0.0](../../README.md) / [userController](../README.md) / IUserController

# Interface: IUserController

Interface for the User Controller.

## Methods

### create()

> **create**(`req`, `res`): `void`

Handles user registration.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object containing user data in the body.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object.

#### Returns

`void`

#### Defined in

[src/userController.ts:24](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/af5f928f65b5a1b1f01ef851e3d416d5eeef8bc1/src/userController.ts#L24)

***

### update()

> **update**(`req`, `res`): `void`

Handles user updates.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object containing user data in the body.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object.

#### Returns

`void`

#### Defined in

[src/userController.ts:31](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/af5f928f65b5a1b1f01ef851e3d416d5eeef8bc1/src/userController.ts#L31)
