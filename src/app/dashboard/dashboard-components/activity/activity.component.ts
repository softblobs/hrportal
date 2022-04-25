import { Component, OnInit } from '@angular/core';

interface activity {
  time: string;
  ringColor: string;
  message: string;
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
})
export class ActivityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activity: activity [] = [
    {
      time: "09.50",
      ringColor: "ring-success",
      message: "New ticket on ATF",
    },
    {
      time: "09.46",
      ringColor: "ring-primary",
      message: "Assign team updates",
    },
    {
      time: "09.47",
      ringColor: "ring-info",
      message: "Remove calendar from website",
    },
    {
      time: "09.48",
      ringColor: "ring-warning",
      message: "Update Timesheet",
    }
  ]
  
}
