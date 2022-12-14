import { ProtoServant } from "@/types/proto/trismegistus";

export const servantMaxConstants: Omit<ProtoServant, "slot" | "servantId"> =
  Object.freeze({
    level: 120,
    noblePhantasmLevel: 5,
    append1: 10,
    append2: 10,
    append3: 10,
    skill1: 10,
    skill2: 10,
    skill3: 10,
    fou: 2000,
  });

export const servantMinConstants: Omit<ProtoServant, "slot" | "servantId"> =
  Object.freeze({
    level: 1,
    noblePhantasmLevel: 1,
    append1: 0,
    append2: 0,
    append3: 0,
    skill1: 1,
    skill2: 1,
    skill3: 1,
    fou: 0,
  });
