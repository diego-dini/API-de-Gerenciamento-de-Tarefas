[**com.docker.devenvironments.code v1.0.0**](../../README.md) • **Docs**

***

[com.docker.devenvironments.code v1.0.0](../../README.md) / [hashUtils](../README.md) / hashString

# Function: hashString()

> **hashString**(`value`): `string` \| `null`

Hashes a given string or binary-like input using the SHA-256 algorithm.

## Parameters

• **value**: `BinaryLike`

The input value to be hashed. Must be of type BinaryLike (string, Buffer, etc.).

## Returns

`string` \| `null`

The SHA-256 hash of the input in hexadecimal format, or null if the input is falsy.

## Defined in

[hashUtils.ts:9](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/97f461cf7047b749ac664a9b903c45f556eaccb0/src/hashUtils.ts#L9)
