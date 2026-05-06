/**
 * ERC-8021 Integration
 * For attributing transactions and builder codes on Base.
 */

import { toHex, stringToHex } from "viem";

export const BUILDER_CODE = "bc_shzxfyvs";
export const ATTRIBUTION_CODE = "[ATTRIBUTION_CODE]"; // Replaced by standard attribution

export interface AttributionData {
  builderCode: string;
  actionCode?: string;
}

export function getAttributionPayload(actionCode?: string): AttributionData {
  return {
    builderCode: BUILDER_CODE,
    actionCode: actionCode || ATTRIBUTION_CODE,
  };
}

export function encodeAttributionData(data: AttributionData): `0x${string}` {
  // In a real implementation this would tightly encode into calldata or a specific format
  // expected by the ERC-8021 standard.
  const str = JSON.stringify(data);
  return stringToHex(str);
}
