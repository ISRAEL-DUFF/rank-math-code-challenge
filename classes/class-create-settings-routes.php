<?php
/**
 * This file will create Custom Rest API End Points.
 */
class WP_React_Settings_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'wprk/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_settings' ],
            'permission_callback' => [ $this, 'get_settings_permission' ]
        ] );
    }

    public function get_settings() {
        global $wpdb;

        $table_name = $wpdb->prefix . 'rank_math_analysis';

        $results = $wpdb->get_results(

            "SELECT * FROM $table_name"

        );

        return rest_ensure_response( json_encode($results) );
    }

    public function get_settings_permission() {
        return true;
    }
}
new WP_React_Settings_Rest_Route();