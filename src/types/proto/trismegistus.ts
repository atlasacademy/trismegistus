/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum MemberSlot {
  NONE = 0,
  FIELD_1 = 1,
  FIELD_2 = 2,
  FIELD_3 = 3,
  SUB_1 = 4,
  SUB_2 = 5,
  SUB_3 = 6,
  UNRECOGNIZED = -1,
}

export function memberSlotFromJSON(object: any): MemberSlot {
  switch (object) {
    case 0:
    case "NONE":
      return MemberSlot.NONE;
    case 1:
    case "FIELD_1":
      return MemberSlot.FIELD_1;
    case 2:
    case "FIELD_2":
      return MemberSlot.FIELD_2;
    case 3:
    case "FIELD_3":
      return MemberSlot.FIELD_3;
    case 4:
    case "SUB_1":
      return MemberSlot.SUB_1;
    case 5:
    case "SUB_2":
      return MemberSlot.SUB_2;
    case 6:
    case "SUB_3":
      return MemberSlot.SUB_3;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MemberSlot.UNRECOGNIZED;
  }
}

export function memberSlotToJSON(object: MemberSlot): string {
  switch (object) {
    case MemberSlot.NONE:
      return "NONE";
    case MemberSlot.FIELD_1:
      return "FIELD_1";
    case MemberSlot.FIELD_2:
      return "FIELD_2";
    case MemberSlot.FIELD_3:
      return "FIELD_3";
    case MemberSlot.SUB_1:
      return "SUB_1";
    case MemberSlot.SUB_2:
      return "SUB_2";
    case MemberSlot.SUB_3:
      return "SUB_3";
    case MemberSlot.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum CommandType {
  NO_COMMAND = 0,
  SKILL_1 = 1,
  SKILL_2 = 2,
  SKILL_3 = 3,
  UNRECOGNIZED = -1,
}

export function commandTypeFromJSON(object: any): CommandType {
  switch (object) {
    case 0:
    case "NO_COMMAND":
      return CommandType.NO_COMMAND;
    case 1:
    case "SKILL_1":
      return CommandType.SKILL_1;
    case 2:
    case "SKILL_2":
      return CommandType.SKILL_2;
    case 3:
    case "SKILL_3":
      return CommandType.SKILL_3;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommandType.UNRECOGNIZED;
  }
}

export function commandTypeToJSON(object: CommandType): string {
  switch (object) {
    case CommandType.NO_COMMAND:
      return "NO_COMMAND";
    case CommandType.SKILL_1:
      return "SKILL_1";
    case CommandType.SKILL_2:
      return "SKILL_2";
    case CommandType.SKILL_3:
      return "SKILL_3";
    case CommandType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum BattleCommandType {
  SKIP = 0,
  COMMAND_CARD = 1,
  NOBLE_PHANTASM = 2,
  INCAPACITATE = 3,
  UNRECOGNIZED = -1,
}

export function battleCommandTypeFromJSON(object: any): BattleCommandType {
  switch (object) {
    case 0:
    case "SKIP":
      return BattleCommandType.SKIP;
    case 1:
    case "COMMAND_CARD":
      return BattleCommandType.COMMAND_CARD;
    case 2:
    case "NOBLE_PHANTASM":
      return BattleCommandType.NOBLE_PHANTASM;
    case 3:
    case "INCAPACITATE":
      return BattleCommandType.INCAPACITATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BattleCommandType.UNRECOGNIZED;
  }
}

export function battleCommandTypeToJSON(object: BattleCommandType): string {
  switch (object) {
    case BattleCommandType.SKIP:
      return "SKIP";
    case BattleCommandType.COMMAND_CARD:
      return "COMMAND_CARD";
    case BattleCommandType.NOBLE_PHANTASM:
      return "NOBLE_PHANTASM";
    case BattleCommandType.INCAPACITATE:
      return "INCAPACITATE";
    case BattleCommandType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ProtoMysticCode {
  mysticCodeId: number;
  mysticCodeLevel: number;
}

export interface ProtoTeamSlot {
  servantId: number;
  servantLevel: number;
  fou: number;
  noblePhantasmLevel: number;
  skill1: number;
  skill2: number;
  skill3: number;
  append1: number;
  append2: number;
  append3: number;
  craftEssenceId: number;
  craftEssenceLevel: number;
  craftEssenceMLB: boolean;
}

export interface ProtoCommand {
  type: CommandType;
  source: MemberSlot;
  target: MemberSlot;
}

export interface ProtoBattleCommand {
  type: BattleCommandType;
  source: MemberSlot;
}

export interface ProtoBattleStep {
  commands: ProtoCommand[];
  battleCommands: ProtoBattleCommand[];
}

export interface ProtoTeam {
  mysticCode: ProtoMysticCode | undefined;
  slots: ProtoTeamSlot[];
  commandScript: ProtoBattleStep[];
}

export interface ProtoTrismegistusState {
  teams: ProtoTeam[];
}

function createBaseProtoMysticCode(): ProtoMysticCode {
  return { mysticCodeId: 0, mysticCodeLevel: 0 };
}

export const ProtoMysticCode = {
  encode(message: ProtoMysticCode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mysticCodeId !== 0) {
      writer.uint32(8).uint32(message.mysticCodeId);
    }
    if (message.mysticCodeLevel !== 0) {
      writer.uint32(16).uint32(message.mysticCodeLevel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtoMysticCode {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtoMysticCode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mysticCodeId = reader.uint32();
          break;
        case 2:
          message.mysticCodeLevel = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProtoMysticCode {
    return {
      mysticCodeId: isSet(object.mysticCodeId) ? Number(object.mysticCodeId) : 0,
      mysticCodeLevel: isSet(object.mysticCodeLevel) ? Number(object.mysticCodeLevel) : 0,
    };
  },

  toJSON(message: ProtoMysticCode): unknown {
    const obj: any = {};
    message.mysticCodeId !== undefined && (obj.mysticCodeId = Math.round(message.mysticCodeId));
    message.mysticCodeLevel !== undefined && (obj.mysticCodeLevel = Math.round(message.mysticCodeLevel));
    return obj;
  },

  create<I extends Exact<DeepPartial<ProtoMysticCode>, I>>(base?: I): ProtoMysticCode {
    return ProtoMysticCode.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProtoMysticCode>, I>>(object: I): ProtoMysticCode {
    const message = createBaseProtoMysticCode();
    message.mysticCodeId = object.mysticCodeId ?? 0;
    message.mysticCodeLevel = object.mysticCodeLevel ?? 0;
    return message;
  },
};

function createBaseProtoTeamSlot(): ProtoTeamSlot {
  return {
    servantId: 0,
    servantLevel: 0,
    fou: 0,
    noblePhantasmLevel: 0,
    skill1: 0,
    skill2: 0,
    skill3: 0,
    append1: 0,
    append2: 0,
    append3: 0,
    craftEssenceId: 0,
    craftEssenceLevel: 0,
    craftEssenceMLB: false,
  };
}

export const ProtoTeamSlot = {
  encode(message: ProtoTeamSlot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.servantId !== 0) {
      writer.uint32(8).uint32(message.servantId);
    }
    if (message.servantLevel !== 0) {
      writer.uint32(16).uint32(message.servantLevel);
    }
    if (message.fou !== 0) {
      writer.uint32(24).uint32(message.fou);
    }
    if (message.noblePhantasmLevel !== 0) {
      writer.uint32(32).uint32(message.noblePhantasmLevel);
    }
    if (message.skill1 !== 0) {
      writer.uint32(40).uint32(message.skill1);
    }
    if (message.skill2 !== 0) {
      writer.uint32(48).uint32(message.skill2);
    }
    if (message.skill3 !== 0) {
      writer.uint32(56).uint32(message.skill3);
    }
    if (message.append1 !== 0) {
      writer.uint32(64).uint32(message.append1);
    }
    if (message.append2 !== 0) {
      writer.uint32(72).uint32(message.append2);
    }
    if (message.append3 !== 0) {
      writer.uint32(80).uint32(message.append3);
    }
    if (message.craftEssenceId !== 0) {
      writer.uint32(88).uint32(message.craftEssenceId);
    }
    if (message.craftEssenceLevel !== 0) {
      writer.uint32(96).uint32(message.craftEssenceLevel);
    }
    if (message.craftEssenceMLB === true) {
      writer.uint32(104).bool(message.craftEssenceMLB);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtoTeamSlot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtoTeamSlot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.servantId = reader.uint32();
          break;
        case 2:
          message.servantLevel = reader.uint32();
          break;
        case 3:
          message.fou = reader.uint32();
          break;
        case 4:
          message.noblePhantasmLevel = reader.uint32();
          break;
        case 5:
          message.skill1 = reader.uint32();
          break;
        case 6:
          message.skill2 = reader.uint32();
          break;
        case 7:
          message.skill3 = reader.uint32();
          break;
        case 8:
          message.append1 = reader.uint32();
          break;
        case 9:
          message.append2 = reader.uint32();
          break;
        case 10:
          message.append3 = reader.uint32();
          break;
        case 11:
          message.craftEssenceId = reader.uint32();
          break;
        case 12:
          message.craftEssenceLevel = reader.uint32();
          break;
        case 13:
          message.craftEssenceMLB = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProtoTeamSlot {
    return {
      servantId: isSet(object.servantId) ? Number(object.servantId) : 0,
      servantLevel: isSet(object.servantLevel) ? Number(object.servantLevel) : 0,
      fou: isSet(object.fou) ? Number(object.fou) : 0,
      noblePhantasmLevel: isSet(object.noblePhantasmLevel) ? Number(object.noblePhantasmLevel) : 0,
      skill1: isSet(object.skill1) ? Number(object.skill1) : 0,
      skill2: isSet(object.skill2) ? Number(object.skill2) : 0,
      skill3: isSet(object.skill3) ? Number(object.skill3) : 0,
      append1: isSet(object.append1) ? Number(object.append1) : 0,
      append2: isSet(object.append2) ? Number(object.append2) : 0,
      append3: isSet(object.append3) ? Number(object.append3) : 0,
      craftEssenceId: isSet(object.craftEssenceId) ? Number(object.craftEssenceId) : 0,
      craftEssenceLevel: isSet(object.craftEssenceLevel) ? Number(object.craftEssenceLevel) : 0,
      craftEssenceMLB: isSet(object.craftEssenceMLB) ? Boolean(object.craftEssenceMLB) : false,
    };
  },

  toJSON(message: ProtoTeamSlot): unknown {
    const obj: any = {};
    message.servantId !== undefined && (obj.servantId = Math.round(message.servantId));
    message.servantLevel !== undefined && (obj.servantLevel = Math.round(message.servantLevel));
    message.fou !== undefined && (obj.fou = Math.round(message.fou));
    message.noblePhantasmLevel !== undefined && (obj.noblePhantasmLevel = Math.round(message.noblePhantasmLevel));
    message.skill1 !== undefined && (obj.skill1 = Math.round(message.skill1));
    message.skill2 !== undefined && (obj.skill2 = Math.round(message.skill2));
    message.skill3 !== undefined && (obj.skill3 = Math.round(message.skill3));
    message.append1 !== undefined && (obj.append1 = Math.round(message.append1));
    message.append2 !== undefined && (obj.append2 = Math.round(message.append2));
    message.append3 !== undefined && (obj.append3 = Math.round(message.append3));
    message.craftEssenceId !== undefined && (obj.craftEssenceId = Math.round(message.craftEssenceId));
    message.craftEssenceLevel !== undefined && (obj.craftEssenceLevel = Math.round(message.craftEssenceLevel));
    message.craftEssenceMLB !== undefined && (obj.craftEssenceMLB = message.craftEssenceMLB);
    return obj;
  },

  create<I extends Exact<DeepPartial<ProtoTeamSlot>, I>>(base?: I): ProtoTeamSlot {
    return ProtoTeamSlot.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProtoTeamSlot>, I>>(object: I): ProtoTeamSlot {
    const message = createBaseProtoTeamSlot();
    message.servantId = object.servantId ?? 0;
    message.servantLevel = object.servantLevel ?? 0;
    message.fou = object.fou ?? 0;
    message.noblePhantasmLevel = object.noblePhantasmLevel ?? 0;
    message.skill1 = object.skill1 ?? 0;
    message.skill2 = object.skill2 ?? 0;
    message.skill3 = object.skill3 ?? 0;
    message.append1 = object.append1 ?? 0;
    message.append2 = object.append2 ?? 0;
    message.append3 = object.append3 ?? 0;
    message.craftEssenceId = object.craftEssenceId ?? 0;
    message.craftEssenceLevel = object.craftEssenceLevel ?? 0;
    message.craftEssenceMLB = object.craftEssenceMLB ?? false;
    return message;
  },
};

function createBaseProtoCommand(): ProtoCommand {
  return { type: 0, source: 0, target: 0 };
}

export const ProtoCommand = {
  encode(message: ProtoCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.source !== 0) {
      writer.uint32(16).int32(message.source);
    }
    if (message.target !== 0) {
      writer.uint32(24).int32(message.target);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtoCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtoCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.source = reader.int32() as any;
          break;
        case 3:
          message.target = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProtoCommand {
    return {
      type: isSet(object.type) ? commandTypeFromJSON(object.type) : 0,
      source: isSet(object.source) ? memberSlotFromJSON(object.source) : 0,
      target: isSet(object.target) ? memberSlotFromJSON(object.target) : 0,
    };
  },

  toJSON(message: ProtoCommand): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = commandTypeToJSON(message.type));
    message.source !== undefined && (obj.source = memberSlotToJSON(message.source));
    message.target !== undefined && (obj.target = memberSlotToJSON(message.target));
    return obj;
  },

  create<I extends Exact<DeepPartial<ProtoCommand>, I>>(base?: I): ProtoCommand {
    return ProtoCommand.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProtoCommand>, I>>(object: I): ProtoCommand {
    const message = createBaseProtoCommand();
    message.type = object.type ?? 0;
    message.source = object.source ?? 0;
    message.target = object.target ?? 0;
    return message;
  },
};

function createBaseProtoBattleCommand(): ProtoBattleCommand {
  return { type: 0, source: 0 };
}

export const ProtoBattleCommand = {
  encode(message: ProtoBattleCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.source !== 0) {
      writer.uint32(16).int32(message.source);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtoBattleCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtoBattleCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.source = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProtoBattleCommand {
    return {
      type: isSet(object.type) ? battleCommandTypeFromJSON(object.type) : 0,
      source: isSet(object.source) ? memberSlotFromJSON(object.source) : 0,
    };
  },

  toJSON(message: ProtoBattleCommand): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = battleCommandTypeToJSON(message.type));
    message.source !== undefined && (obj.source = memberSlotToJSON(message.source));
    return obj;
  },

  create<I extends Exact<DeepPartial<ProtoBattleCommand>, I>>(base?: I): ProtoBattleCommand {
    return ProtoBattleCommand.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProtoBattleCommand>, I>>(object: I): ProtoBattleCommand {
    const message = createBaseProtoBattleCommand();
    message.type = object.type ?? 0;
    message.source = object.source ?? 0;
    return message;
  },
};

function createBaseProtoBattleStep(): ProtoBattleStep {
  return { commands: [], battleCommands: [] };
}

export const ProtoBattleStep = {
  encode(message: ProtoBattleStep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.commands) {
      ProtoCommand.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.battleCommands) {
      ProtoBattleCommand.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtoBattleStep {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtoBattleStep();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.commands.push(ProtoCommand.decode(reader, reader.uint32()));
          break;
        case 2:
          message.battleCommands.push(ProtoBattleCommand.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProtoBattleStep {
    return {
      commands: Array.isArray(object?.commands) ? object.commands.map((e: any) => ProtoCommand.fromJSON(e)) : [],
      battleCommands: Array.isArray(object?.battleCommands)
        ? object.battleCommands.map((e: any) => ProtoBattleCommand.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProtoBattleStep): unknown {
    const obj: any = {};
    if (message.commands) {
      obj.commands = message.commands.map((e) => e ? ProtoCommand.toJSON(e) : undefined);
    } else {
      obj.commands = [];
    }
    if (message.battleCommands) {
      obj.battleCommands = message.battleCommands.map((e) => e ? ProtoBattleCommand.toJSON(e) : undefined);
    } else {
      obj.battleCommands = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProtoBattleStep>, I>>(base?: I): ProtoBattleStep {
    return ProtoBattleStep.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProtoBattleStep>, I>>(object: I): ProtoBattleStep {
    const message = createBaseProtoBattleStep();
    message.commands = object.commands?.map((e) => ProtoCommand.fromPartial(e)) || [];
    message.battleCommands = object.battleCommands?.map((e) => ProtoBattleCommand.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProtoTeam(): ProtoTeam {
  return { mysticCode: undefined, slots: [], commandScript: [] };
}

export const ProtoTeam = {
  encode(message: ProtoTeam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mysticCode !== undefined) {
      ProtoMysticCode.encode(message.mysticCode, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.slots) {
      ProtoTeamSlot.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.commandScript) {
      ProtoBattleStep.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtoTeam {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtoTeam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mysticCode = ProtoMysticCode.decode(reader, reader.uint32());
          break;
        case 2:
          message.slots.push(ProtoTeamSlot.decode(reader, reader.uint32()));
          break;
        case 3:
          message.commandScript.push(ProtoBattleStep.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProtoTeam {
    return {
      mysticCode: isSet(object.mysticCode) ? ProtoMysticCode.fromJSON(object.mysticCode) : undefined,
      slots: Array.isArray(object?.slots) ? object.slots.map((e: any) => ProtoTeamSlot.fromJSON(e)) : [],
      commandScript: Array.isArray(object?.commandScript)
        ? object.commandScript.map((e: any) => ProtoBattleStep.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProtoTeam): unknown {
    const obj: any = {};
    message.mysticCode !== undefined &&
      (obj.mysticCode = message.mysticCode ? ProtoMysticCode.toJSON(message.mysticCode) : undefined);
    if (message.slots) {
      obj.slots = message.slots.map((e) => e ? ProtoTeamSlot.toJSON(e) : undefined);
    } else {
      obj.slots = [];
    }
    if (message.commandScript) {
      obj.commandScript = message.commandScript.map((e) => e ? ProtoBattleStep.toJSON(e) : undefined);
    } else {
      obj.commandScript = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProtoTeam>, I>>(base?: I): ProtoTeam {
    return ProtoTeam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProtoTeam>, I>>(object: I): ProtoTeam {
    const message = createBaseProtoTeam();
    message.mysticCode = (object.mysticCode !== undefined && object.mysticCode !== null)
      ? ProtoMysticCode.fromPartial(object.mysticCode)
      : undefined;
    message.slots = object.slots?.map((e) => ProtoTeamSlot.fromPartial(e)) || [];
    message.commandScript = object.commandScript?.map((e) => ProtoBattleStep.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProtoTrismegistusState(): ProtoTrismegistusState {
  return { teams: [] };
}

export const ProtoTrismegistusState = {
  encode(message: ProtoTrismegistusState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.teams) {
      ProtoTeam.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtoTrismegistusState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtoTrismegistusState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.teams.push(ProtoTeam.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProtoTrismegistusState {
    return { teams: Array.isArray(object?.teams) ? object.teams.map((e: any) => ProtoTeam.fromJSON(e)) : [] };
  },

  toJSON(message: ProtoTrismegistusState): unknown {
    const obj: any = {};
    if (message.teams) {
      obj.teams = message.teams.map((e) => e ? ProtoTeam.toJSON(e) : undefined);
    } else {
      obj.teams = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProtoTrismegistusState>, I>>(base?: I): ProtoTrismegistusState {
    return ProtoTrismegistusState.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProtoTrismegistusState>, I>>(object: I): ProtoTrismegistusState {
    const message = createBaseProtoTrismegistusState();
    message.teams = object.teams?.map((e) => ProtoTeam.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
