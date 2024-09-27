[**com.docker.devenvironments.code v1.0.0**](../../README.md) • **Docs**

***

[com.docker.devenvironments.code v1.0.0](../../README.md) / [teamController](../README.md) / default

# Variable: default

> `const` **default**: `object`

## Type declaration

### create()

Creates a new team if the session is valid.
The owner of the team is either specified in the request body or defaults to the current session user.
The owner is also added as a member of the new team.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object, containing team data in the body.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object.

#### Returns

`undefined` \| `Response`\<`any`, `Record`\<`string`, `any`\>\>

### delete()

Deletes a team if the session is valid and the requesting user is the team owner.
First removes all members of the team, then deletes the team itself.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object, containing team id in the body.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object.

#### Returns

`undefined` \| `Response`\<`any`, `Record`\<`string`, `any`\>\>

### update()

Updates a team's details if the session is valid and the requesting user is the team owner.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Express request object, containing team data and id in the body.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

Express response object.

#### Returns

`undefined` \| `Response`\<`any`, `Record`\<`string`, `any`\>\>

## Defined in

[teamController.ts:12](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/97f461cf7047b749ac664a9b903c45f556eaccb0/src/teamController.ts#L12)
