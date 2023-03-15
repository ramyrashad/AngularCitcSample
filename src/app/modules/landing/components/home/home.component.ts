import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ServerService } from 'src/app/common/server_service/server_service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private serverService: ServerService,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    debugger;
    let serverLoadContent = this.document.getElementById("serverLoadContent");
    if (serverLoadContent) {
      this.serverService.getHTMLContent().then(res => {
        let headerContent = this.document.getElementById("headerContent");
        if (headerContent) {
          headerContent.innerHTML = res.header;
          headerContent.removeAttribute("id");
        }

        let headContent = this.document.getElementById("headContent");
        if (headContent) {
          headContent.innerHTML = "<title>SSR Test</title> <base href='/'>" + res.head;
          headContent.removeAttribute("id");
        }

        let footerContent = this.document.getElementById("footerContent");
        if (footerContent) {
          footerContent.innerHTML = res.footer;
          footerContent.removeAttribute("id");
        }

        let sidebarContent = this.document.getElementById("sidebarContent");
        if (sidebarContent) {
          sidebarContent.innerHTML = res.sidebar;
          sidebarContent.removeAttribute("id");
        }

        let scriptsContent = this.document.getElementById("scriptsContent");
        if (scriptsContent) {
          scriptsContent.innerHTML = res.scripts;
          scriptsContent.removeAttribute("id");
        }
      });
      serverLoadContent.removeAttribute("id");
    }
    else {
      let headerContent2 = this.document.getElementById("headerContent2");
      headerContent2.innerHTML = "Content Loaded";
    }
  }

}
