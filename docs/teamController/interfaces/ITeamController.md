[**com.docker.devenvironments.code v1.0.0**](../../README.md) • **Docs**

***

[com.docker.devenvironments.code v1.0.0](../../README.md) / [teamController](../README.md) / ITeamController

# Interface: ITeamController

Interface for the Team Controller.

## Methods

### create()

> **create**(`req`, `res`): `void`

Creates a new team if the session is valid.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object, containing team data in the body.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object.

#### Returns

`void`

#### Defined in

[teamController.ts:18](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/teamController.ts#L18)

***

### delete()

> **delete**(`req`, `res`): `void`

Deletes a team if the session is valid and the requesting user is the team owner.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object, containing team id in the body.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object.

#### Returns

`void`

#### Defined in

[teamController.ts:25](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/teamController.ts#L25)

***

### update()

> **update**(`req`, `res`): `void`

Updates a team's details if the session is valid and the requesting user is the team owner.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object, containing team data and id in the body.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object.

#### Returns

`void`

#### Defined in

[teamController.ts:32](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/teamController.ts#L32)
