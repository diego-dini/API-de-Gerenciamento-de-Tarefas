[**com.docker.devenvironments.code v1.0.0**](../../README.md) • **Docs**

***

[com.docker.devenvironments.code v1.0.0](../../README.md) / [databaseSingleton](../README.md) / default

# Function: default()

> **default**(`customdbPath`): [`default`](../../databaseManager/classes/default.md)

Singleton function that initializes and provides access to a single DatabaseManager instance.
Ensures only one instance of the DatabaseManager is created and shared throughout the application.

## Parameters

• **customdbPath**: `null` \| `string` = `null`

## Returns

[`default`](../../databaseManager/classes/default.md)

The DatabaseManager instance.

## Defined in

[src/databaseSingleton.ts:13](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/af5f928f65b5a1b1f01ef851e3d416d5eeef8bc1/src/databaseSingleton.ts#L13)
