import { Component, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-instruction-modal",
  templateUrl: "./instruction-modal.component.html",
  styleUrls: ["./instruction-modal.component.scss"],
})
export class InstructionModalComponent implements OnInit {
  constructor(private BsModalService: BsModalService) {}

  action: string = "cancel";
  ngOnInit(): void {}
  Cancel() {
    this.BsModalService.hide();
  }

  testAction(ev) {
    this.action = ev;
    this.Cancel();
  }
}
