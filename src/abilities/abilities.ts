import PassiveAbilityDescriptor from "./PassiveAbilityDescriptor";
import { BasicAttack } from "../attack/BasicAttack";
import { CastAbilityDescriptor } from "./CastAbilityDescriptor";

export type Ability = CastAbilityDescriptor | PassiveAbilityDescriptor | BasicAttack;
