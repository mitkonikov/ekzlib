import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CodeService } from '../code.service';
import { File } from '../file';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-file-browser',
  templateUrl: 'file-browser.component.html',
  styleUrls: []
})
export class FileBrowserComponent implements OnInit {
  public file: File;

  constructor(
    private codeService: CodeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap(async (params: ParamMap) => {
        const name = params.get('file');
        const title = await this.codeService.getTitle(name);
        return this.codeService.getFile({
          name,
          title,
          repo: 'ekzhang/library'
        });
      })
      .subscribe(file => {
        this.file = file;
      });
  }
}
