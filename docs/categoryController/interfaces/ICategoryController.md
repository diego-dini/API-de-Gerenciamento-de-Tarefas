[**com.docker.devenvironments.code v1.0.0**](../../README.md) • **Docs**

***

[com.docker.devenvironments.code v1.0.0](../../README.md) / [categoryController](../README.md) / ICategoryController

# Interface: ICategoryController

Interface for the Category Controller.

## Methods

### create()

> **create**(`req`, `res`): `void`

Creates a new category.

#### Parameters

• **req**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

The HTTP request object, containing the category name in the body.

• **res**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

The HTTP response object used to send back the desired HTTP response.

#### Returns

`void`

void - This method sends a JSON response and does not return a value.

#### Defined in

[src/categoryController.ts:25](https://github.com/diego-dini/API-de-Gerenciamento-de-Tarefas/blob/af5f928f65b5a1b1f01ef851e3d416d5eeef8bc1/src/categoryController.ts#L25)
