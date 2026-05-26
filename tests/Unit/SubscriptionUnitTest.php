<?php

namespace Tests\Unit;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;

class SubscriptionUnitTest extends TestCase
{
    public function test_month_subscription_adds_30_days()
    {
        $startDate = Carbon::parse('2026-05-26');

        $endDate = $startDate->copy()->addDays(30);

        $this->assertEquals(
            '2026-06-25',
            $endDate->format('Y-m-d')
        );
    }
}
