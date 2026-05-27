/// A sprinkler demo.
/// Multiple sprinkler zone configuration and automation with user intervention such as hold off time periods on zones.
/// 
/// @Copyright SmartonLabs Inc. 2019-2026

const SprinklerStringResources: { [key: string]: string } = {
    "NOTIFICATION_HOLD_OFF_CHANGED": "Hold off list for zone %s changed.",
    "NOTIFICATION_ANOTHER": "Hello world."
};

/**
 * Union discriminators for zone data protocol
 */
declare const enum ZoneDataKind {
    /**
     * Get zone information
     * Get the sprinkler runtime information for the zone.
     * @LibertasRequest
     * @LibertasSubscriptionRequest
     * @LibertasNextResponse(ZoneInfo)
     */
    GetZoneInfo = 0,
    /**
     * Zone information
     * Information about the sprinkler zone's next watering schedule and hold-off period list. A hold-off ensures the zone won't be watered during the period.
     * @LibertasResponse
     * @LibertasSubscriptionData
     * @LibertasNextRequest("UpdateHoldOff")
     */    
    ZoneInfo = 1,
    /**
     * Update hold off periods
     * A request to update the entire list of "hold off" periods of the sprinkler zone. The system ensures the zone won't be watered during each hold off period.
     * @LibertasRequest
     * @LibertasNextResponse(ZoneInfo)
     */
    UpdateHoldOff = 2,
}

/**
 * A time period
 * Including a start time and a duration.
 */
declare interface TimeSlot {
    /**
     * Start time
     * The start time.
     */
    startTime: LibertasDateTime;
    /**
     * Duration
     * The duration in seconds.
     */
    duration: number;
}

/** 
 * Libertas sprinkler runtime protocol
 * The runtime protocol of Libertas sprinkler agent
 */
declare type ZoneDataProtocol = 
    {
        kind: ZoneDataKind.GetZoneInfo;
    } | 
    {
        kind: ZoneDataKind.ZoneInfo;
        /**
         * Next watering schedule
         * The next scheduled watering time and duration. This schedule is dynamically calculated and may change later. The calculation must avoid the hold-off periods.
         */
        nextSchedule: TimeSlot;
        /**
         * Hold off periods
         * The list of sprinkler's hold-off period that the dynamic calculation of watering schedule must avoid. A hold-off ensures a sprinkler zone (area) won't be watered during the period.
         * ----
         * Hold off period
         * A start time and duration of a watering hold-off.
         */
        holdOffPeriods: TimeSlot[];    
    } |
    {
        kind: ZoneDataKind.UpdateHoldOff;
        /**
         * Hold off periods
         * The list of sprinkler's hold-off period that the dynamic calculation of watering schedule must avoid. A hold-off ensures a sprinkler zone (area) won't be watered during the period.
         * ----
         * Hold off period
         * A start time and duration of a watering hold-off.
         */
        holdOffPeriods: TimeSlot[];
    };

/**
 * Type of soil.
 */
const enum SoilType {
    Loam,
    Clay,
    ClayLoam,
    SiltyClay,
    SandyLoam,
    LoamySand,
    Sand,
}

/**
 * Type of plant.
 */
const enum PlantType {
    Lawn,
    FruitTrees,
    Flowers,
    Vegetables,
    Citrus,
    TreesBushes,
    Xeriscape,
}

/**
 * 
 */
const enum SprinklerHead {
    SurfaceDrip,
    Bubblers,
    PopupSpray,
    RotorsLowRate,
    RotorsHighRate,
}

/**
 * Sprinkler zone
 * A sprinkler zone configuration
 */
declare class SprinklerZone {
    /**
     * Zone
     * An irrigation sprinkler valve device that controls the watering of the area.
     * @LibertasUnique
     */
    zoneValve: LibertasDevice;
    /**
     * Field capacity
     * @LibertasInteger(type=u8, min=0, max=100, step=1)
     */
    fieldCapacity: number;
    /**
     * Soil type
     */
    soilType: SoilType;
    /**
     * Plant type
     */
    plantType: PlantType;
    head: SprinklerHead;
    /**
     * @LibertasAgentToolSchema(ZoneDataProtocol)
     * @LibertasAgentToolServer
     * @LibertasBaseObjects("^.zone_valve")
     */
    zoneInfo: LibertasAgentTool;
}

/**
 * Libertas sprinkler agent.
 * The user configures the information about each zone.
 * It automatically calculate the optimal watering schedule for each zone based on onfomration such as
 * watering history, weather forescast, etc.
 * During runtime, the user can maintain a list of "hold-off" periods on each zone when watering shall be prevented.
 * The hold-off period list will affect the watring schedule acting as a constraint.
 * 
 * @param zones User defined watering areas. Each zhone is controlled by a valve.
 * 
 * @LibertasStringResources(SprinklerStringResources)
 */
export function LibertasSmartSprinkler(
    /**
     * Zones
     * List of sprinkler zones (water areas).
     * @LibertasArray(minSize=1)
     * 
     * -----
     * 
     * Zone config
     * Configuration of one sprinkler zone.
     */
    zones: SprinklerZone[],
) {
    // TODOL: Implement the agent logic here.
}
