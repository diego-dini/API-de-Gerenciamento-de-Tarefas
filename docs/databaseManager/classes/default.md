[**com.docker.devenvironments.code v1.0.0**](../../README.md) • **Docs**

***

[com.docker.devenvironments.code v1.0.0](../../README.md) / [databaseManager](../README.md) / default

# Class: default

Manages interactions with an SQLite database.

## Constructors

### new default()

> **new default**(`databasePath`): [`default`](default.md)

Initializes the database, loading or creating a database file at the specified path.
If the database file does not exist, it will be created based on the provided schema.

#### Parameters

• **databasePath**: `string`

The path to the database file.

#### Returns

[`default`](default.md)

#### Defined in

[databaseManager.ts:158](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/databaseManager.ts#L158)

## Methods

### addTeamMember()

> **addTeamMember**(`teamId`, `userId`): [`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

Adds a member to a team.

#### Parameters

• **teamId**: `number`

The ID of the team to which the member will be added.

• **userId**: `number`

The ID of the user to be added to the team.

#### Returns

[`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

- The result of the operation.

#### Defined in

[databaseManager.ts:326](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/databaseManager.ts#L326)

***

### delete()

> **delete**(`request`): [`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

Deletes a record from the specified table based on a column value.

#### Parameters

• **request**: `RequestParams`

The parameters for the delete operation.

#### Returns

[`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

- The result of the delete operation.

#### Throws

- Throws an error if the column or value is missing or invalid.

#### Defined in

[databaseManager.ts:252](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/databaseManager.ts#L252)

***

### insert()

> **insert**(`request`): [`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

Inserts a new record into the specified table.

#### Parameters

• **request**: `RequestParams`

The parameters for the insert operation.

#### Returns

[`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

- The result of the insert operation.

#### Throws

- Throws an error if data is null.

#### Defined in

[databaseManager.ts:223](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/databaseManager.ts#L223)

***

### removeAllTeamMembers()

> **removeAllTeamMembers**(`teamId`): [`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

Removes all members from a team.

#### Parameters

• **teamId**: `number`

The ID of the team from which all members will be removed.

#### Returns

[`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

- The result of the remove operation.

#### Defined in

[databaseManager.ts:361](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/databaseManager.ts#L361)

***

### removeTeamMember()

> **removeTeamMember**(`teamId`, `userId`): [`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

Removes a member from a team.

#### Parameters

• **teamId**: `number`

The ID of the team from which the member will be removed.

• **userId**: `number`

The ID of the user to be removed from the team.

#### Returns

[`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

- The result of the remove operation.

#### Defined in

[databaseManager.ts:344](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/databaseManager.ts#L344)

***

### select()

> **select**(`request`): [`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

Selects a record from the specified table based on a column value.

#### Parameters

• **request**: `RequestParams`

The parameters for the select operation.

#### Returns

[`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

- The result of the select operation.

#### Defined in

[databaseManager.ts:307](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/databaseManager.ts#L307)

***

### update()

> **update**(`request`): [`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

Updates a record in the specified table based on a column value.

#### Parameters

• **request**: `RequestParams`

The parameters for the update operation.

#### Returns

[`DatabaseResponse`](../type-aliases/DatabaseResponse.md)

- The result of the update operation.

#### Throws

- Throws an error if the column, value, or data is missing or invalid.

#### Defined in

[databaseManager.ts:275](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/0a729810d2cf26a474d52eec41dd5669ce3252ea/src/databaseManager.ts#L275)
