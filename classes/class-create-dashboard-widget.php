<?php
/**
 * This file will create admin menu page.
 */

class WPRK_Create_Dashboard_Widget {

    public function __construct() {
        add_action( 'wp_dashboard_setup', [ $this, 'my_dashboard_widget' ] );
    }

    public function my_dashboard_widget() {
        wp_add_dashboard_widget(
            'rank_math_dashboard_widget',
            'Rank Math Dashboard Widget',
            array($this,'rank_math_chart_widget')
        );
    }

    public function rank_math_chart_widget() {
        echo '<div class="wrap"><div id="wprk-admin-app"></div></div>';
    }

}
new WPRK_Create_Dashboard_Widget();