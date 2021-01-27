<?php
/**
 * RSN Data plugin for Craft CMS 3.x
 *
 * RSN Data Engagement plugin for CraftCMS
 *
 * @link      https://percipio.london
 * @copyright Copyright (c) 2020 Percipio
 */

namespace percipioglobal\rsndata;

use percipioglobal\rsndata\services\RsnDataService as RsnDataServiceService;
use percipioglobal\rsndata\models\Settings;
use percipioglobal\rsndata\fields\RsnDataField as RsnDataFieldField;
use percipioglobal\rsndata\widgets\DataEngagement as DataEngagementWidget;
use percipioglobal\rsndata\helpers\RsnDataExtension; 


use Craft;
use craft\base\Element;
use craft\base\Plugin;
use craft\events\RegisterComponentTypesEvent;
use craft\events\PluginEvent;
use craft\helpers\ElementHelper;
use craft\helpers\UrlHelper;
use craft\services\Fields;
use craft\services\Dashboard;
use craft\services\Plugins;
use craft\services\UserPermissions;
use craft\web\UrlManager;

use yii\base\Event;

/**
 * Craft plugins are very much like little applications in and of themselves. We’ve made
 * it as simple as we can, but the training wheels are off. A little prior knowledge is
 * going to be required to write a plugin.
 *
 * For the purposes of the plugin docs, we’re going to assume that you know PHP and SQL,
 * as well as some semi-advanced concepts like object-oriented programming and PHP namespaces.
 *
 * https://docs.craftcms.com/v3/extend/
 *
 * @author    Percipio
 * @package   RsnData
 * @since     1.0.0
 *
 * @property  RsnDataServiceService $rsnDataService
 * @property  Settings $settings
 * @method    Settings getSettings()
 */
class RsnData extends Plugin
{
    // Static Properties
    // =========================================================================

    /**
     * Static property that is an instance of this plugin class so that it can be accessed via
     * RsnData::$plugin
     *
     * @var RsnData
     */
    public static $plugin;

    // Public Properties
    // =========================================================================

    /**
     * To execute your plugin’s migrations, you’ll need to increase its schema version.
     *
     * @var string
     */
    public $schemaVersion = '1.0.0';

    /**
     * Set to `true` if the plugin should have a settings view in the control panel.
     *
     * @var bool
     */
    public $hasCpSettings = true;

    /**
     * Set to `true` if the plugin should have its own section (main nav item) in the control panel.
     *
     * @var bool
     */
    public $hasCpSection = true;

    // Public Methods
    // =========================================================================

    /**
     * Set our $plugin static property to this class so that it can be accessed via
     * RsnData::$plugin
     *
     * Called after the plugin class is instantiated; do any one-time initialization
     * here such as hooks and events.
     *
     * If you have a '/vendor/autoload.php' file, it will be loaded for you automatically;
     * you do not need to load it in your init() method.
     *
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        if (Craft::$app->request->getIsCpRequest()) {
            // Add in our Twig extension
            $rsnDataExtension = new rsnDataExtension();
            Craft::$app->view->registerTwigExtension($rsnDataExtension);
        }

        // Register our fields
        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = RsnDataFieldField::class;
            }
        );

        /* Register our widgets
        Event::on(
            Dashboard::class,
            Dashboard::EVENT_REGISTER_WIDGET_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = DataEngagementWidget::class;
            }
        );

        */

        // Do something after we're installed
        Event::on(
            Plugins::class,
            Plugins::EVENT_AFTER_INSTALL_PLUGIN,
            function (PluginEvent $event) {
                if ($event->plugin === $this) {
                    // We were just installed
                }
            }
        );

/**
 * Logging in Craft involves using one of the following methods:
 *
 * Craft::trace(): record a message to trace how a piece of code runs. This is mainly for development use.
 * Craft::info(): record a message that conveys some useful information.
 * Craft::warning(): record a warning message that indicates something unexpected has happened.
 * Craft::error(): record a fatal error that should be investigated as soon as possible.
 *
 * Unless `devMode` is on, only Craft::warning() & Craft::error() will log to `craft/storage/logs/web.log`
 *
 * It's recommended that you pass in the magic constant `__METHOD__` as the second parameter, which sets
 * the category to the method (prefixed with the fully qualified class name) where the constant appears.
 *
 * To enable the Yii debug toolbar, go to your user account in the AdminCP and check the
 * [] Show the debug toolbar on the front end & [] Show the debug toolbar on the Control Panel
 *
 * http://www.yiiframework.com/doc-2.0/guide-runtime-logging.html
 */
        Craft::info(
            Craft::t(
                'rsn-data',
                '{name} plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );
    }

    // Protected Methods
    // =========================================================================

    /**
     * Creates and returns the model used to store the plugin’s settings.
     *
     * @return \craft\base\Model|null
     */
    protected function createSettingsModel()
    {
        return new Settings();
    }

    /**
     * Returns the rendered settings HTML, which will be inserted into the content
     * block on the settings page.
     *
     * @return string The rendered settings HTML
     */
    protected function settingsHtml(): string
    {
        return Craft::$app->view->renderTemplate(
            'rsn-data/settings',
            [
                'settings' => $this->getSettings()
            ]
        );
    }

     // CP NAV
    // =========================================================================


    protected function _registerCpRoutes()
    {
        Event::on(UrlManager::class, UrlManager::EVENT_REGISTER_CP_URL_RULES, function(RegisterUrlRulesEvent $event) {
            $event->rules['rsn-data/'] = ['template' => 'rsn-data/'];
            $event->rules['rsn-data/schools/'] = ['template' => 'rsn-data/cp/schools'];
            $event->rules['rsn-data/schools/'] = ['template' => 'rsn-data/cp/schools/view'];
            $event->rules['rsn-data/trainings/'] = ['template' => 'rsn-data/cp/trainings'];
            $event->rules['rsn-data/export/'] = ['template' => 'rsn-data/cp/export/'];
        });
    }
}
