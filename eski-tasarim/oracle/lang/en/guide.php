<?php

return [

    // ============================================================================
    // SHARED / COMMON
    // ============================================================================
    'reset'                => 'Reset',
    'all'                  => 'All',
    'boss'                 => 'Boss',
    'level'                => 'Level',
    'day'                  => 'Day',
    'permanent'            => 'Permanent',
    'unknown'              => 'Unknown',
    'data_loading'         => 'Loading data...',
    'search_item'          => 'Search item...',
    'drop_chance'          => 'Drop Chance',
    'drops'                => 'Drops',
    'quantity'             => 'Quantity',
    'result'               => 'Result',
    'how_it_works'         => 'How It Works',
    'piece_count'          => ':count piece(s)',
    'select_item_desc'     => 'Select an item from the list to see details.',
    'try_different_filter' => 'Try a different filter.',
    'no_rewards_yet'       => 'No rewards found.',
    'others'               => 'Others',

    // ============================================================================
    // BEGINNER
    // ============================================================================
    'beginner' => [
        'starting_stats'      => 'Starting Stats',
        'starting_stats_desc' => 'Your character\'s base stats at the start.',
        'starting_items'      => 'Starting Items',
        'welcome_gifts'       => 'Welcome Gifts',
        'no_gifts'            => 'No welcome gifts available.',
        'no_items'            => 'No starting items available.',
        'gift_count'          => ':count gift(s)',
        'item_count'          => ':count item(s)',
    ],

    // ============================================================================
    // CHESTS
    // ============================================================================
    'chests' => [
        'title'             => 'Chests',
        'all'               => 'All Chests',
        'select'            => 'Select a chest to view its contents.',
        'not_found'         => 'Chest not found.',
        'unknown'           => 'Unknown Chest',
        'count'             => ':count chest(s)',
        'categories'        => 'Categories',
        'select_category'   => 'Select a category.',
        'category_not_found'=> 'Category not found.',
        'group_items'       => 'Items in group',
        'normal_items'      => 'Normal Items',
        'unknown_group'     => 'Unknown Group',
        'unknown_item'      => 'Unknown Item',
        'total_items'       => 'Total Items',
        'bonus_chance_info' => 'Bonus chance info',
        'bonus_chance_item' => 'Bonus chance item',
        'with_bonus_item'   => 'With bonus item',
        'base_chance'       => 'Base chance',
        'success_drop_info' => 'Successful drop info',
    ],

    // ============================================================================
    // MOBS
    // ============================================================================
    'mobs' => [
        'title'          => 'Mobs',
        'search'         => 'Search mob...',
        'select'         => 'Select a mob to view its drops.',
        'not_found'      => 'No mob found.',
        'no_drops'       => 'No drops available.',
        'no_map_data'    => 'No map data available.',
        'no_spawn_data'  => 'No spawn data available.',
        'spawn_point'    => 'Spawn Point',
        'select_zone'    => 'Select Zone',
        'zones_found'    => ':count zone(s) found',
        'nation_label'   => 'Nation',
        'nation_all'     => 'All Nations',
        'min_level'      => 'Min Level',
        'level_label'    => 'Level',
    ],

    // ============================================================================
    // ITEM MIX
    // ============================================================================
    'item_mix' => [
        'required_materials' => 'Required Materials',
        'possible_results'   => 'Possible Results',
        'production_success' => 'Success Rate',
        'no_recipe_found'    => 'No recipe found.',
        'material_not_found' => 'Material not found.',
        'no_matching_item'   => 'No matching item.',
        'different_recipes'  => ':count recipe(s)',
        'different_items'    => ':count item(s)',
        'different_results'  => ':count result(s)',
        'different_rewards'  => ':count reward(s)',
    ],

    // ============================================================================
    // UPGRADE / SCROLLS
    // ============================================================================
    'upgrade' => [
        'scroll_types'         => 'Scroll Types',
        'scroll_not_found'     => 'No scroll found.',
        'select_scroll'        => 'Select a scroll to view upgrade rates.',
        'no_scroll_data'       => 'No scroll data available.',
        'different_item_types' => ':count item type(s)',
        'level_upgrades'       => ':count level upgrade(s)',
        'total_level'          => 'Total Level',
    ],

    // ============================================================================
    // MINING
    // ============================================================================
    'mining' => [
        'pickaxe'       => 'Pickaxe',
        'rewards'       => 'Mining Rewards',
        'pickaxe_types' => 'Pickaxe Types',
        'not_found'     => 'No pickaxe found.',
        'select'        => 'Select a pickaxe to view drop rates.',
        'no_data'       => 'No mining data available.',
    ],

    // ============================================================================
    // EVENTS
    // ============================================================================
    'events' => [
        'title'        => 'Events',
        'calendar'     => 'Event Calendar',
        'not_found'    => 'No event found.',
        'select'       => 'Select an event to view details.',
        'rewards'      => 'Event Rewards',
        'count'        => ':count event(s)',
        'time_slots'   => ':count time slot(s)',
        'reward_count' => ':count reward(s)',
    ],

    // ============================================================================
    // OTHER REWARDS
    // ============================================================================
    'rewards' => [
        'title'              => 'Other Rewards',
        'description'        => 'Browse all reward types.',
        'types'              => 'Reward Types',
        'type_not_found'     => 'Reward type not found.',
        'select_type'        => 'Select a reward type to view details.',
        'type_count'         => ':count type(s)',
        'label'              => 'Reward',
        'tiers'              => 'Reward Tiers',
        'system'             => 'Reward System',
        'system_type1'       => 'Item rewards for reaching kill milestones',
        'system_type2'       => 'NP (Nation Point) bonuses included',
        'class_specific'     => 'Class-specific rewards available',
        'np_on_assist'       => 'NP reward on every kill assist',
        'class_label'        => 'Class',
        'np_label'           => 'NP Reward',
        'normal'             => 'Normal Reward',
        'premium'            => 'Premium Reward',
        'one_time'           => 'One-time Reward',
        'count'              => ':count reward(s)',

        // Kill Assist
        'kill_assist' => [
            'title'        => 'Kill Assist System',
            'not_active'   => 'Kill Assist not active.',
            'coming_soon'  => 'Kill Assist rewards coming soon.',
            'help_1'       => 'Deal damage to an enemy player to earn a kill assist.',
            'help_2'       => 'Kill assists are counted per session.',
            'help_3'       => 'Rewards scale with the number of assists.',
            'help_4'       => 'Some rewards are class-specific.',
            'levels'       => ':count reward level(s)',
        ],

        // Online Rewards
        'online' => [
            'not_active'  => 'Online reward not active.',
            'coming_soon' => 'Online rewards coming soon.',
            'minutes'     => ':count minute(s) online',
            'package'     => 'Package System',
        ],

        // Daily Rewards
        'daily' => [
            'calendar'     => 'Daily Reward Calendar',
            'description'  => 'Login every day to claim your rewards.',
            'not_found'    => 'No daily reward found.',
            'requirements' => 'Requirements',
            'count'        => ':count day(s)',
            'min_loyalty'  => 'Min Loyalty',
            'min_rebirth'  => 'Min Rebirth',
            'rebirth'      => 'Rebirth',
            'reset_day'    => 'Reset Day',
            'duration'     => 'Item Duration',
            'days' => [
                'monday'    => 'Monday',
                'tuesday'   => 'Tuesday',
                'wednesday' => 'Wednesday',
                'thursday'  => 'Thursday',
                'friday'    => 'Friday',
                'saturday'  => 'Saturday',
                'sunday'    => 'Sunday',
            ],
        ],
    ],

    // ============================================================================
    // CLAN GUIDE
    // ============================================================================
    'clan' => [
        'title' => 'Clan Guide',
    ],

];
