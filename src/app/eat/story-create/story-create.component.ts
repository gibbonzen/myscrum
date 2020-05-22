import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Job, getIcon } from '../model/job.model';
import { Story } from '../model/story.model';
import { StoryService } from 'src/service/story/story.service';
import { Closable } from 'src/external_modules/ui/dialog/dialog.component';

const JOBS: Job[] = [
  { name: 'dev' },
  { name: 'tma' },
  { name: 'test' },
  { name: 'support' }
];

@Component({
  selector: 'eat-story-create',
  templateUrl: './story-create.component.html',
  styleUrls: ['./story-create.component.scss']
})
export class StoryCreateComponent implements OnInit, Closable {
  @Input() model: {
    title: string
  }
  @Input() onClose: () => void;

  jobs: Job[] = JOBS;
  form: FormGroup;

  constructor(private fb: FormBuilder, 
    private storyService: StoryService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  getIcon(job: Job) {
    return getIcon(job);
  }

  create() {
    let values = this.form.value;
    let story = new Story(values.name, values.desc, this.jobs.find(j => j.name === values.job));
    this.storyService.create(story);
    
    if(this.onClose) this.onClose();
  }
  
}
