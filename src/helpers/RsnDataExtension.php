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
            new \Twig\TwigFunction('arrayInsert', array(
                $this,
                'arrayInsert'
            )) ,
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
            new \Twig\TwigFunction('engagementLevel', array(
                $this,
                'engagementLevel'
            )) ,
            new \Twig\TwigFunction('followOnSupport', array(
                $this,
                'followOnSupport'
            )) ,
            new \Twig\TwigFunction('fetchUrns', array(
                $this,
                'fetchUrns'
            )) ,
            new \Twig\TwigFunction('fetchGeo', array(
                $this,
                'fetchGeo'
            )) ,
            new \Twig\TwigFunction('fetchPriority', array(
                $this,
                'fetchPriority'
            )) ,
            new \Twig\TwigFunction('sortEvents', array(
                $this,
                'sortEvents'
            )) ,
        );

    }

    function arrayInsert($info, $arrayLoop)
    {
        $array = array();

        foreach ($arrayLoop as $arrayItem)
        {
            $array[] = array_merge($info['info'], $arrayItem);
        }

        return ($array);

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

    public function engagementLevel($array, $level)
    {
        $array = array_merge($array);
        $arraySum = array();

        foreach ($array as $vals)
        {
            if (array_key_exists($vals['school'], $array))
            {
                $arraySum[$vals['school']]['attendance'] += $vals['attendance'];
            }
            else
            {
                $arraySum[$vals['school']] = $vals;
            }
        }

        $array = array_column($arraySum, 'attendance');

        if ($level == 1)
        {
            array_walk_recursive($array, function ($i) use (&$count)
            {
                $count += (int)($i === '1');
            });
        }
        if ($level == 2)
        {
            array_walk_recursive($array, function ($i) use (&$count)
            {
                $count += (int)($i === '2');
            });
        }
        if ($level == 3)
        {
            array_walk_recursive($array, function ($i) use (&$count)
            {
                $count += (int)($i >= '3');
            });
        }

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

        $remappedArray = array_combine(preg_replace(array_map(function ($s)
        {
            return "/^$s$/";
        }
        , array_keys($options)) , $options, array_keys($array)) , $array);

        return $remappedArray;
    }

    public function fetchUrns($array)
    {
        $array = array_merge($array);
        $array = array_unique(array_column($array, 'schooldata'));
        $array = array_filter($array, 'is_numeric');
        // print_r($array);
        $array = implode('|', $array);

        return $array;
    }

    public function fetchGeo($array, $priority, $api)
    {

        $response = null;
        $array = array_merge($array);
        $array = array_unique(array_column($array, 'schooldata'));
        $array = array_filter($array, 'is_numeric');

        $url = $api . '/geoFromUrns';
        $array = json_encode($array);

        $c = curl_init();

        curl_setopt($c, CURLOPT_USERAGENT, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36');
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($c, CURLOPT_AUTOREFERER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);

        curl_setopt($c, CURLOPT_URL, $url);
        curl_setopt($c, CURLOPT_REFERER, $url);
        curl_setopt($c, CURLOPT_POST, true);
        curl_setopt($c, CURLOPT_POSTFIELDS, ["priority" => $priority, "data" => $array]);

        $result = curl_exec($c);

        if (curl_errno($c))
        {
            $response = json_encode(curl_error($c));
        }
        else
        {
            $response = $result;
        }
        curl_close($c);

        //   print_r($response);
        return $response;
    }

    public function fetchPriority($array, $api)
    {

        $response = 1;
        $array = array_merge($array);
        $array = array_unique(array_column($array, 'schooldata'));
        $array = array_filter($array, 'is_numeric');

        $url = $api . '/priorityFromUrns';
        $array = json_encode($array);

        $c = curl_init();

        curl_setopt($c, CURLOPT_USERAGENT, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36');
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($c, CURLOPT_AUTOREFERER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);

        curl_setopt($c, CURLOPT_URL, $url);
        curl_setopt($c, CURLOPT_REFERER, $url);
        curl_setopt($c, CURLOPT_POST, true);
        curl_setopt($c, CURLOPT_POSTFIELDS, ["data" => $array]);

        $result = curl_exec($c);

        if (curl_errno($c))
        {
            // $response = json_encode(curl_error($c));
            $response = 1;
        }
        else
        {
            $response = json_decode($result);
            $response = $response[0]->count;
        }
        curl_close($c);

        //   print_r($response);
        return $response;
    }

    function sortEvents($events, $start, $end)
    {
        $sortedEvents = [];

        $start = strtotime($start);
        $end = strtotime($end);

        $i = 0;
        foreach ($events as $event)
        {
            $i++;
            $eventDates = $event
                ->type->handle === 'onlineEvent' ? $event
                ->eventDatesTimeOnline
                ->all() : $event
                ->eventDatesTime
                ->all();
            // print_r($eventDates);
            $eventDays = $this->sortEventDates($eventDates, $start, $end);
            // use unix date as array key to allow k sorting
            if (count($eventDays) > 0)
            {
                $startDate = 0;
                if ($eventDays[array_key_last($eventDays) ]->startDateTime != null)
                {
                    $startDate = $eventDays[array_key_last($eventDays) ]
                        ->startDateTime
                        ->format('U') + $i;
                }

                $sortedEvents[$startDate] = $event;
            }
        }

        krsort($sortedEvents);
        return array_values($sortedEvents);
    }

    public function sortEventDates($dates, $start, $end)
    {

        $eventDays = [];
        foreach ($dates as $date)
        {
            $eventDate = null;
            if ($date->startDateTime != null)
            {
                $eventDate = strtotime($date
                    ->startDateTime
                    ->format('Y-m-d'));
            }
            if ($start == null)
            {
                $eventDays[] = $date;
            }
            if (($eventDate >= $start) && ($eventDate < $end))
            {
                $eventDays[] = $date;
            }
        }

        return $eventDays;

    }

}

