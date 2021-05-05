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
use craft\events\PluginEvent;
use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterUserPermissionsEvent;
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
 * @method    Settings getSettinstallEventListenersings()
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
     *
     * @var bool
     */
    public $hasCpSettings = true;

    /**
     *
     * @var bool
     */
    public $hasCpSection = true;

    /**
     * @var array
     */
    public static $userOperations;

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
        self::$userOperations = $this->_getUserOperations();

        if (Craft::$app->request->getIsCpRequest()) {
            // Add in our Twig extension
            $rsnDataExtension = new RsnDataExtension();
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

        // Register our plugin permissions
       Event::on(
           UserPermissions::class,
           UserPermissions::EVENT_REGISTER_PERMISSIONS,
           function(RegisterUserPermissionsEvent $event) {
           $event->permissions[Craft::t('rsn-data', 'RSN Data')] = [
                   'rsndataAccessAll' => ['label' => Craft::t('rsn-data', 'Access all schools')],
                   'rsndataAccessBeta' => ['label' => Craft::t('rsn-data', 'Access beta functions')],
                ];
            }
        );

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
            $event->rules['rsn-data/beta/'] = ['template' => 'rsn-data/beta', 'variables' => ['template' => 'rsn-data/cp/export/', 'rsndataAccessBeta' => self::$userOperations]];
        });
    }

    // Permission handler
    // =========================================================================
    private function _getUserOperations():array
    {
        $operations = [];

        if (Craft::$app->getUser()->getIdentity()) {
            $user = Craft::$app->getUser()->getIdentity();
            $operations['rsndataAccessAll'] = $user->admin || $user->can('rsndataAccessAll');
            $operations['rsndataAccessBeta'] = $user->admin || $user->can('rsndataAccessBeta');
        } else {
            $operations['rsndataAccessAll'] = false;
            $operations['rsndataAccessBeta'] = false;
        }

        return $operations;
    }
}
