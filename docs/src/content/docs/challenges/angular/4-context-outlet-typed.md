---
title: 🔴 Typed ContextOutlet
description: Challenge 4 is about strongly typing ngContextOutlet directives
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - svenson95
  - jdegand
challengeNumber: 4
command: angular-context-outlet-type
blogLink: https://medium.com/@thomas.laforge/ngtemplateoutlet-type-checking-5d2dcb07a2c6
sidebar:
  order: 201
---

## Information

Angular offer the static function [`ngTemplateContextGuard`](https://angular.io/guide/structural-directives#typing-the-directives-context) to strongly type structural directive.

However the context of **NgTemplateOutlet** type is **Object**. But with the help of the above guard, we can improve that behavior.

## Statement

In this exercise, we want to learn how to strongly type our ng-template in our AppComponent.

This exercise has two levels of complexity.

### Level 1: known Interface

Currently we have the following piece of code.

![Unkown Person](../../../../assets/4/unknown-person.png 'Unkown Person')

As we can see, name is of type "any". We want to infer the correct type.

### Level 2: generic Interface

Currently we have the following piece of code.

![Unkown Student](../../../../assets/4/unknown-student.png 'Unkown Student')

As we can see, student is of type "any". We want to infer the correct type.

But in this part, we can pass to ListComponent, a list of **any object**. And we still want the correct type to be inferred.
