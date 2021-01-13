<?php
/**
 * RSN Data plugin for Craft CMS 3.x
 *
 * RSN Data Engagement plugin for CraftCMS
 *
 * @link      https://percipio.london
 * @copyright Copyright (c) 2020 Percipio
 */

namespace percipioglobal\rsndata\models;

use percipioglobal\rsndata\RsnData;

use Craft;
use craft\base\Model;

/**
 * RsnDataModel Model
 *
 * Models are containers for data. Just about every time information is passed
 * between services, controllers, and templates in Craft, it’s passed via a model.
 *
 * https://craftcms.com/docs/plugins/models
 *
 * @author    Percipio
 * @package   RsnData
 * @since     1.0.0
 */
class RsnDataModel extends Model
{
    // Public Properties
    // =========================================================================

    /**
     * Some model attribute
     *
     * @var string
     */
    public $googleApiKey = '';

    // Public Methods
    // =========================================================================

    /**
     * Returns the validation rules for attributes.
     *
     * Validation rules are used by [[validate()]] to check if attribute values are valid.
     * Child classes may override this method to declare different validation rules.
     *
     * More info: http://www.yiiframework.com/doc-2.0/guide-input-validation.html
     *
     * @return array
     */
    public function rules()
    {
        return [
            ['googleApiKey', 'string'],
            ['googleApiKey', 'default', 'value' => ''],
        ];
    }
}
