import { Table, TableCell, AlignmentType, Document, Header, PageNumber, Paragraph, TabStopPosition, TabStopType, TextRun, SymbolRun, TableRow, WidthType, VerticalAlign } from "docx";
export class DocumentCreator {
    // tslint:disable-next-line: typedef
    public create(data, data2, deviceData): Document {

        const document = new Document();
        document.addSection({
            headers: {
                default: new Header({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    children: [PageNumber.CURRENT],
                                    size: 32,
                                    font: {
                                        name: "TH SarabunIT๙",

                                    },
                                }),

                            ],
                        }),
                    ],
                }),
            },
            properties: {},
            children: [
                this.crtHead(),
                this.contend1(),
                this.eventData(data, data2),
                this.matCost(deviceData["new"]),
                this.addTable(deviceData["new"]),
                this.matCost2(deviceData["reuse"]),
                this.addTable(deviceData["reuse"]),
                this.para2(data2),
                this.para3(data2),
                //

            ],
        });

        return document;
    }

    crtHead() {
        return new Paragraph({
            tabStops: [
                {
                    type: TabStopType.LEFT,
                    position: 5000,
                },
            ],
            children: [
                new TextRun({
                    text: "จาก   ผปร.กวว.(น.2)\tถึง      หผ.ปบ.",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "เลขที่\tวันที่",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "เรื่อง   การประเมินค่าเสียหายที่เกิดขึ้นกับระบบจำหน่าย",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "",
                    size: 12,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "เรียน หผ.ปบ.",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
            ],

        });
    }
    contend1() {
        return new Paragraph({
            tabStops: [
                {
                    type: TabStopType.LEFT,
                    position: 500,
                },
            ],
            children: [
                new TextRun({
                    text: "\tตามที่ได้ดำเนินการตรวจสอบและประเมินราคา ค่าเสียหายเพื่อเรียกร้องจากผู้กระทำการละเมิด โดยมีรายละเอียดดังนี้",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),

            ],

        });
    }
    matCost(data) {
        var total = data.map(t => t.total).reduce((acc, value) => Number(acc) + Number(value), 0);
        return new Paragraph({
            tabStops: [
                {
                    type: TabStopType.LEFT,
                    position: 500,
                },
            ],
            children: [
                new TextRun({
                    text: "\t11.1 รื้อถอน-ติดตั้งใหม่ " + data.length + " รายการ เป็นจำนวนเงินทั้งสิ้น " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),

            ],

        });
    }
    matCost2(data) {
        var total = data.map(t => t.total).reduce((acc, value) => Number(acc) + Number(value), 0);
        return new Paragraph({
            tabStops: [
                {
                    type: TabStopType.LEFT,
                    position: 500,
                },
            ],
            children: [
                new TextRun({
                    text: "\t11.2 แผนกซ่อมแซม " + data.length + " รายการ เป็นจำนวนเงินทั้งสิ้น " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),

            ],

        });
    }
    para2(data) {
        var total = data.map(t => t.total).reduce((acc, value) => Number(acc) + Number(value), 0);
        return new Paragraph({
            tabStops: [
                {
                    type: TabStopType.LEFT,
                    position: 500,
                },
            ],
            children: [
                new TextRun({
                    text: "\tจึงเรียนมาเพื่อพิจารณาอนุมัติให้ดำเนินการเบิกอุปกรณ์ไปซ่อมแซมตามรายการดังกล่าวพร้อมดำเนินการเรียกเก็บเงินค่าเสียหายจากผู้กระทำการละเมิด เป็นจำนวนเงินทั้งสิ้น " + data[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),

            ],

        });
    }
    para3(data) {
        var total = data.map(t => t.total).reduce((acc, value) => Number(acc) + Number(value), 0);
        return new Paragraph({
            children: [
                new TextRun({
                    text: "",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "                                                                                       (                                       )",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "                                                                                                      ตำแหน่ง       ",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),

            ],

        });
    }
    eventData(data, data2) {
        var myDate = new Date(data.DateDamge);
        var mntArr = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
        var mnt = mntArr[myDate.getMonth()];
        var myYear = Number(myDate.getFullYear()) + Number(543);
        var myShort = myDate.getDate() + " " + mnt + " " + myYear;
        return new Paragraph({
            children: [
                new TextRun({
                    text: "1. เหตุเกิดเมื่อ วันที่ " + myShort + " เวลาประมาณ " + data.TimeDamge,
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "2. สถานที่เกิดเหตุ " + data.PlaceDamage,
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "3. หมายเลขทะเบียนรถยนต์ " + data.PlateNum,
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "4. ชื่อผู้ขับขี่ " + data.Name,
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "5. ที่อยู่ตามบัตร " + data.address,
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "6. ชื่อ/บริษัท เจ้าของรถ " + data.carOwnName,
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "ที่อยู่ " + data.carAddress,
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "7. ชื่อ/บริษัท ประกัน " + data.InsCom,
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "8. ผู้ลงนามในหนังสือรับสภาพหนี้",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new TextRun({
                    text: "                ",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new SymbolRun("F071"),
                new TextRun({
                    text: " ผู้ขับขี่            ",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }),
                new SymbolRun("F071"),
                new TextRun({
                    text: " เจ้าของยานพาหนะ            ",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }),
                new SymbolRun("F071"),
                new TextRun({
                    text: " ไม่ยินยอม            ",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }),
                new TextRun({
                    text: "9.การแจ้งความร้องทุกข์ กับเจ้าหน้าที่ตำรวจ",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },
                }).break(),
                new TextRun({
                    text: "                ",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }).break(),
                new SymbolRun("F071"),
                new TextRun({
                    text: " แจ้งเป็นหลักฐาน            ",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }),
                new SymbolRun("F071"),
                new TextRun({
                    text: " แจ้งเป็นความคดี เนื่องจาก " + data.policeNote,
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },

                }),

                new TextRun({
                    text: "10. กรณีรถยนต์เกี่ยวสายสื่อสารทำให้เกิดความเสียหายกับระบบจำหน่าย",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },
                }).break(),
                new TextRun({
                    text: "ชื่อ/บริษัท เจ้าของสายสื่อสาร " + data.teleName + " ความสูง " + data.teleHigh + " เมตร",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },
                }).break(),
                new TextRun({
                    text: "11. รายการอุปกรณ์ที่ได้รับความเสียหาย " + data2[1] + " รายการคิดเป็นค่าเสียหายจำนวนทั้งสิ้น " + data2[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท โดยมีรายละเอียดดังนี้",
                    size: 32,
                    font: {
                        name: "TH SarabunIT๙",

                    },
                }).break(),
            ],

        });
    }
    addTable(deviceData) {
        var myrow = [];

        const header = new TableRow({
            tableHeader: true,
            children: [
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "รายการ",
                                size: 32,
                                font: {
                                    name: "TH SarabunIT๙",

                                },

                            }),

                        ],

                    })
                    ],
                }),
                new TableCell({
                    width: {
                        size: 6000,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "ชื่อพัสดุ",
                                size: 32,
                                font: {
                                    name: "TH SarabunIT๙",

                                },

                            }),

                        ],

                    })
                    ],
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "จำนวน",
                                size: 32,
                                font: {
                                    name: "TH SarabunIT๙",

                                },

                            }),

                        ],

                    })
                    ],
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "หน่วย",
                                size: 32,
                                font: {
                                    name: "TH SarabunIT๙",

                                },

                            }),

                        ],

                    })
                    ],
                }),
                new TableCell({
                    width: {
                        size: 1000,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "ราคา",
                                size: 32,
                                font: {
                                    name: "TH SarabunIT๙",

                                },

                            }),

                        ],

                    })
                    ],
                }),
            ],
        });
        myrow.push(header);
        if (deviceData.length > 0) {
            var index = 0;
            deviceData.forEach(data => {
                index++;
                const mytable = new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: index.toString(),
                                        size: 32,
                                        font: {
                                            name: "TH SarabunIT๙",

                                        },

                                    }),

                                ],

                            })
                            ],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: data.deviceName,
                                        size: 32,
                                        font: {
                                            name: "TH SarabunIT๙",

                                        },

                                    }),

                                ],

                            })
                            ],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: data.DeviceQ,
                                        size: 32,
                                        font: {
                                            name: "TH SarabunIT๙",

                                        },

                                    }),

                                ],

                            })
                            ],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: data.unit,
                                        size: 32,
                                        font: {
                                            name: "TH SarabunIT๙",

                                        },

                                    }),

                                ],

                            })
                            ],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                children: [
                                    new TextRun({
                                        text: data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                        size: 32,
                                        font: {
                                            name: "TH SarabunIT๙",

                                        },

                                    }),

                                ],

                            })
                            ],
                        }),
                    ]
                });
                myrow.push(mytable);
            });
        }
        return new Table({
            alignment: AlignmentType.CENTER,
            rows: myrow,

        });
    }
}