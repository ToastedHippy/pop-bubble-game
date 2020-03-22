import {ResourcesDefinition, ResourceStore} from "./Resource-store";

export function WithResources(resDefs: ResourcesDefinition) {
    return function (target: Function) {
        ResourceStore.instance.defineResource(target, resDefs);
    };
}
