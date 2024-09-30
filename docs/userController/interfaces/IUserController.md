[**com.docker.devenvironments.code v1.0.0**](../../README.md) • **Docs**

***

[com.docker.devenvironments.code v1.0.0](../../README.md) / [userController](../README.md) / IUserController

# Interface: IUserController

Interface for the User Controller.

## Methods

### register()

> **register**(`req`, `res`): `void`

Handles user registration.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object containing user data in the body.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object.

#### Returns

`void`

#### Defined in

[userController.ts:20](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/userController.ts#L20)

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

[userController.ts:27](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/userController.ts#L27)
