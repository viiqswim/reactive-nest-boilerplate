# Creating a new container

1. Copy the NestJsConnector container folder (`src/app/containers/NestJsConnector`)
2. In `container/containerName/types.ts` modify the `NestJsConnectorState` interface name to whatever you want.
3. In `src/types/RootState.ts` include the interface specified in the previous step. This interface describes that state that the container will manage.
4. In `src/app/containers/containerName/slice.ts` change the `nestJsConnector` to the name specified in `src/types/RootState.ts`.
5. In `src/app/containers/containerName/slice.ts` change the `initialState: ContainerState` contents to whatever you want the initial state of the container to be.
6. In `src/app/containers/containerName/slice.ts` change the `nestJsConnector` string in the `createSlice` to the name specified in `src/types/RootState.ts`.
7. In `src/app/containers/containerName/saga.ts` change the `nestJsConnectorSaga` function name at the bottom of the file to whatever you want the name of the saga to be.
8. In `container/containerName/index.ts` replace the `nestJsConnectorSaga` at the top with the function name specified at the bottom of `src/app/containers/containerName/saga.ts`.
9. In the `src/app/containers/containerName/selectors.ts` change the `state.nestJsConnector` within the `selectDomain` function to the name specified in the `src/types/RootState.ts`.
10. That's it. Those are the minimum required steps to make the new container work.

```text
Note: Additional changes are required to change the name of different variables and functions within the container to match the new container's name. Additionally, other changes will be required to update the unit tests. This can all be accomplished easily with a quick find and replace within the new container's folder.
```

For a sample full change-set look at [this commit](https://github.com/viiqswim/reactive-nest-boilerplate/commit/e1e152b2d303bd71737646387b552f0ea17cf7c1).