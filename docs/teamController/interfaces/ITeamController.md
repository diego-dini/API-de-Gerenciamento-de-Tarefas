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

[src/teamController.ts:21](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/af5f928f65b5a1b1f01ef851e3d416d5eeef8bc1/src/teamController.ts#L21)

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

[src/teamController.ts:28](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/af5f928f65b5a1b1f01ef851e3d416d5eeef8bc1/src/teamController.ts#L28)

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

[src/teamController.ts:35](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/af5f928f65b5a1b1f01ef851e3d416d5eeef8bc1/src/teamController.ts#L35)
