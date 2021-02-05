<?php
/**
 * RSN Data plugin for Craft CMS 3.x
 *
 * RSN Data Engagement plugin for CraftCMS
 *
 * @link      https://percipio.london
 * @copyright Copyright (c) 2020 Percipio
 */

namespace percipioglobal\rsndata\helpers;

use percipioglobal\rsndata\RsnData;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

use Craft;

class RsnDataExtension extends AbstractExtension
{

    public function getFunctions()
    {
        return array(
            new \Twig\TwigFunction('totalSchools', array(
                $this,
                'totalSchools'
            )) ,
            new \Twig\TwigFunction('avgSchools', array(
                $this,
                'avgSchools'
            )) ,
            new \Twig\TwigFunction('totalAttendees', array(
                $this,
                'totalAttendees'
            )) ,
            new \Twig\TwigFunction('avgAttendees', array(
                $this,
                'avgAttendees'
            )) ,
            new \Twig\TwigFunction('totalDays', array(
                $this,
                'totalDays'
            )) ,
            new \Twig\TwigFunction('totalEngaged', array(
                $this,
                'totalEngaged'
            )) ,
            new \Twig\TwigFunction('totalSustained', array(
                $this,
                'totalSustained'
            )) ,
            new \Twig\TwigFunction('totalEmbedded', array(
                $this,
                'totalEmbedded'
            )) ,
            new \Twig\TwigFunction('followOnSupport', array(
                $this,
                'followOnSupport'
            )) ,
            new \Twig\TwigFunction('fetchUrns', array(
                $this,
                'fetchUrns'
            )) ,
        );

    }

    function getPercentage($amount, $total)
    {
        return ($amount / $total) * 100;
    }

    public function totalSchools($array)
    {
        $array = array_merge($array);
        $array = count(array_unique(array_column($array, 'school')));
        return $array;
    }

    public function avgSchools($array, $total)
    {
        $array = array_merge($array);
        $array = count(array_unique(array_column($array, 'school')));
        return ($array / $total);
    }

    public function totalAttendees($array)
    {
        $array = count(array_merge($array));
        return $array;
    }

    public function avgAttendees($array, $total)
    {
        $array = count(array_merge($array));
        return ($array / $total);
    }

    public function totalDays($array)
    {
        $array = array_merge($array);
        $array = array_sum(array_column($array, 'attendance'));
        return $array;
    }

    public function totalEngaged($array)
    {
        $array = array_merge($array);
        $array = array_column($array, 'attendance');
        array_walk_recursive($array, function ($i) use (&$count)
        {
            $count += (int)($i === '1');
        });
        return $count;
    }

    public function totalSustained($array)
    {
        $array = array_merge($array);
        $array = array_column($array, 'attendance');
        array_walk_recursive($array, function ($i) use (&$count)
        {
            $count += (int)($i === '2');
        });
        return $count;
    }

    public function totalEmbedded($array)
    {
        $array = array_merge($array);
        $array = array_column($array, 'attendance');
        array_walk_recursive($array, function ($i) use (&$count)
        {
            $count += (int)($i >= '3');
        });
        return $count;
    }

    public function followOnSupport($array)
    {
        $options = array(
            "opt0" => "Additional training day",
            "opt1" => "Coaching",
            "opt2" => "Coordinated planning with school",
            "opt3" => "ELE/SLE/NLE brokerage of visit",
            "opt4" => "ELE/SLE/NLE coaching model",
            "opt5" => "Follow on email",
            "opt6" => "Follow on email series/webinar",
            "opt7" => "Follow up call (linked to activities)",
            "opt8" => "Free expert webinar",
            "opt9" => "Improvement partnership model",
            "opt10" => "Peer partnerships",
            "opt11" => "Post card reminders",
            "opt12" => "Reciprocal peer visit",
            "opt13" => "Reduced fee for further training",
            "opt14" => "Resources to share with colleagues",
            "opt15" => "RSN visit",
            "opt16" => "School/Trust CPD programme",
            "opt17" => "Sign up to newsletters",
            "opt18" => "Supported online implementation programme",
            "opt19" => "Supported school CPD planning",
            "opt20" => "Webinar/online series",
            "opt21" => "Whole school training offer",
        );

        $array = array_merge($array);
        $array = array_count_values($array);

        $remappedArray = array_combine(preg_replace(array_map(function ($s){
            return "/^$s$/";
        }, 
            array_keys($options)), 
            $options, 
            array_keys($array)), 
            $array
        );

        return $remappedArray;
    }

    public function fetchUrns($array)
    {
        $array = array_merge($array);
        $array = array_unique(array_column($array, 'schooldata'));
        $array = array_filter($array, 'is_numeric');
        // print_r($array);
        $array = implode('|',$array);

        return $array;
    }


}