import {ResourcesDefinition, ResourceStore} from "./Resource-store";

export function DefineResources(resDefs: ResourcesDefinition) {
    return function (target: Function) {
        ResourceStore.instance.defineResource(target, resDefs);
    };
}
