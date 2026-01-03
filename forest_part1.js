const forestData = [
    {
        "name": "희리산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/0187/",
        "address": "충남 서천군 종천면 희리산길 206",
        "phone": "041-953-2230",
        "closed": "매주 화요일"
    },
    {
        "name": "흑석산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030045",
        "address": "전남 해남군 계곡면 산골길 306 흑석산자연휴양림",
        "phone": "061-535-4812",
        "closed": "매주 화요일"
    },
    {
        "name": "화천숲속 야영장",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0116",
        "address": "강원 화천군 간동면 배후령길 1144 화천숲속야영장",
        "phone": "033-441-4466",
        "closed": "매주 화요일"
    },
    {
        "name": "황정산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0242",
        "address": "충북 단양군 대강면 황정산로 239-11",
        "phone": "043-421-0608",
        "closed": "매주 화요일"
    },
    {
        "name": "회문산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0188",
        "address": "전북특별자치도 순창군 구림면 안심길 214",
        "phone": "063-653-4779",
        "closed": "매주 화요일"
    },
    {
        "name": "학가산우래자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID04030009",
        "address": "경북 예천군 보문면 휴양림길 210 학가산우래자연휴양림",
        "phone": "054-652-0114",
        "closed": "매주 월요일"
    },
    {
        "name": "한천자연휴양림",
        "url": "https://hancheon.foresttrip.go.kr",
        "address": "전남 화순군 한천면 죽헌로 719 한천자연휴양림",
        "phone": "061-379-3734",
        "closed": ""
    },
    {
        "name": "평창자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030003",
        "address": "강원 평창군 봉평면 팔송로 285 평창자연휴양림",
        "phone": "033-339-9028",
        "closed": ""
    },
    {
        "name": "피노키오자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID04030001",
        "address": "강원 원주시 신림면 소야1길 72 피노키오자연휴양림",
        "phone": "033-764-3007",
        "closed": ""
    },
    {
        "name": "하동편백자연휴양림",
        "url": "https://okjong.foresttrip.go.kr/",
        "address": "경남 하동군 옥종면 돌고지로 1088-51 하동편백자연휴양림",
        "phone": "070-8994-0717",
        "closed": "매주 화요일"
    },
    {
        "name": "하추자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030018",
        "address": "강원 인제군 인제읍 하추로 686 하추자연휴양림",
        "phone": "033-461-0056",
        "closed": ""
    },
    {
        "name": "토함산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030027",
        "address": "경북 경주시 문무대왕면 불국로 1208-45 토함산자연휴양림",
        "phone": "054-750-8700",
        "closed": "둘째주 화요일"
    },
    {
        "name": "통고산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0193",
        "address": "경북 울진군 금강송면 불영계곡로 880",
        "phone": "054-783-3167",
        "closed": "매주 화요일"
    },
    {
        "name": "팔공산금화자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030006",
        "address": "경북 칠곡군 가산면 가산로 323 팔공산금화자연휴양림",
        "phone": "054-971-1551",
        "closed": "매주 화요일"
    },
    {
        "name": "팔영산자연휴양림",
        "url": "https://paryeongsan.foresttrip.go.kr/",
        "address": "전남 고흥군 영남면 팔영로 1347-418 팔영산자연휴양림",
        "phone": "061-830-6990",
        "closed": "매주 화요일"
    },
    {
        "name": "칠보산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0182",
        "address": "경북 영덕군 병곡면 칠보산길 587",
        "phone": "054-732-1607",
        "closed": "매주 화요일"
    },
    {
        "name": "칼봉산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030099",
        "address": "경기 가평군 가평읍 경반안로 454 칼봉산자연휴양림",
        "phone": "031-8078-8062",
        "closed": "",
        "isAd": true
    },
    {
        "name": "태백고원자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030022",
        "address": "강원 태백시 머리골길 153 태백고원자연휴양림",
        "phone": "010-5112-1360",
        "closed": ""
    },
    {
        "name": "태학산자연휴양림",
        "url": "https://taehaksan.foresttrip.go.kr/",
        "address": "충남 천안시 동남구 풍세면 휴양림길 105-2 태학산자연휴양림",
        "phone": "041-529-5108",
        "closed": "매주 화요일"
    },
    {
        "name": "춘천숲자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030125",
        "address": "강원특별자치도 춘천시 동산면 종자리로 224-104",
        "phone": "033-264-1156",
        "closed": ""
    },
    {
        "name": "충북알프스자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030032",
        "address": "충북 보은군 산외면 속리산로 1880 충북알프스자연휴양림",
        "phone": "043-543-1472",
        "closed": "첫째주 월요일"
    },
    {
        "name": "치악산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030024",
        "address": "강원 원주시 판부면 휴양림길 66 치악산자연휴양림",
        "phone": "033-762-8288",
        "closed": "둘째주 화요일"
    },
    {
        "name": "칠갑산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030044",
        "address": "충남 청양군 대치면 칠갑산로 668-103 칠갑산자연휴양림",
        "phone": "041-940-2727",
        "closed": "매주 수요일"
    },
    {
        "name": "청옥산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0183",
        "address": "경북 봉화군 석포면 청옥로 1552-163",
        "phone": "054-672-1051",
        "closed": "매주 화요일"
    },
    {
        "name": "청태산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0106",
        "address": "강원 횡성군 둔내면 청태산로 610",
        "phone": "033-343-9707",
        "closed": "매주 화요일"
    },
    {
        "name": "청평자연휴양림",
        "url": "https://campcp.foresttrip.go.kr/",
        "address": "경기 가평군 청평면 북한강로2246번길 8-6 청평자연휴양림",
        "phone": "031-584-0528",
        "closed": ""
    },
    {
        "name": "축령산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030050",
        "address": "경기 남양주시 수동면 축령산로 299 축령산자연휴양림",
        "phone": "031-8008-6690",
        "closed": "매주 화요일"
    },
    {
        "name": "천보산 자연휴양림",
        "url": "https://chunbosan.foresttrip.go.kr",
        "address": "경기 포천시 원동교길 309 천보산 자연휴양림",
        "phone": "031-540-6210",
        "closed": "매주 화요일"
    },
    {
        "name": "철원 두루웰 숲속문화촌",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030005",
        "address": "강원 철원군 갈말읍 지경1길 69 두루웰숲속문화촌 관리사무소",
        "phone": "033-450-5198",
        "closed": "매주 화요일"
    },
    {
        "name": "청도자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030116",
        "address": "경북 청도군 각북면 비슬산길 111-25",
        "phone": "054-371-9200",
        "closed": "매주 화요일"
    },
    {
        "name": "청송자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030010",
        "address": "경북 청송군 부남면 청송로 3478-96 청송자연휴양림",
        "phone": "054-872-3163",
        "closed": ""
    },
    {
        "name": "진도 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0201",
        "address": "전남 진도군 임회면 동령개길 1-92",
        "phone": "061-542-2346",
        "closed": "매주 화요일"
    },
    {
        "name": "진주 월아산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030114",
        "address": "경남 진주시 진성면 달음산로 313",
        "phone": "055-746-3673",
        "closed": "매주 화요일"
    },
    {
        "name": "집다리골자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030043",
        "address": "강원특별자치도 춘천시 사북면 화악지암1길 130 집다리골자연휴양림",
        "phone": "033-243-8920",
        "closed": "매주 화요일"
    },
    {
        "name": "천관산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0196",
        "address": "전남 장흥군 관산읍 칠관로 842-1150",
        "phone": "061-867-6974",
        "closed": "매주 화요일"
    },
    {
        "name": "주작산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030060",
        "address": "전남 강진군 신전면 주작산길 262 주작산자연휴양림",
        "phone": "061-430-3306",
        "closed": ""
    },
    {
        "name": "중미산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0108",
        "address": "경기 양평군 옥천면 중미산로 1152",
        "phone": "031-771-7166",
        "closed": "매주 화요일"
    },
    {
        "name": "중산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID04030006",
        "address": "경남 산청군 시천면 지리산대로 496-101 중산자연휴양림",
        "phone": "055-974-2757",
        "closed": ""
    },
    {
        "name": "지리산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0190",
        "address": "경남 함양군 마천면 음정길 152",
        "phone": "055-963-8133",
        "closed": "매주 화요일"
    },
    {
        "name": "제암산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030090",
        "address": "전남 보성군 웅치면 대산길 330 제암산자연휴양림",
        "phone": "061-852-4434",
        "closed": ""
    },
    {
        "name": "제주절물자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030053",
        "address": "제주특별자치도 제주시 명림로 584 제주절물자연휴양림",
        "phone": "064-728-1510",
        "closed": ""
    },
    {
        "name": "조령산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030008",
        "address": "충북 괴산군 연풍면 새재로 1795 조령산자연휴양림",
        "phone": "043-833-7994",
        "closed": "매주 월요일"
    },
    {
        "name": "좌구산휴양랜드",
        "url": "https://jpjwagu.foresttrip.go.kr/",
        "address": "충북 증평군 증평읍 솟점말길 107 좌구산휴양림",
        "phone": "043-835-4551",
        "closed": ""
    },
    {
        "name": "자굴산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030113",
        "address": "경남 의령군 가례면 자굴산휴양로 23",
        "phone": "055-572-0030",
        "closed": "매주 화요일"
    },
    {
        "name": "장령산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030036",
        "address": "충북 옥천군 군서면 장령산로 519 장령산자연휴양림",
        "phone": "043-733-9615",
        "closed": ""
    },
    {
        "name": "장태산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030106",
        "address": "대전 서구 장안로 461 장태산자연휴양림",
        "phone": "042-583-0094",
        "closed": ""
    },
    {
        "name": "전라남도 완도자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030021",
        "address": "전남 완도군 완도읍 대야일구1길 115 완도자연휴양림",
        "phone": "061-550-3570",
        "closed": "매주 화요일"
    },
    {
        "name": "운주산승마자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030081",
        "address": "경북 영천시 임고면 승마휴양림길 105 운주산승마자연휴양림",
        "phone": "054-330-2770",
        "closed": "매주 월요일"
    },
    {
        "name": "유명산 자연휴양림",
        "url": "https://foresttrip.go.kr/0101/",
        "address": "경기 가평군 설악면 유명산길 79-53",
        "phone": "031-589-5487",
        "closed": "매주 화요일"
    },
    {
        "name": "의왕바라산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030065",
        "address": "경기 의왕시 바라산로 84 (학의동 산 117-1)",
        "phone": "031-8086-7482",
        "closed": "둘째주 수요일"
    },
    {
        "name": "임해자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030100",
        "address": "강원 강릉시 강동면 율곡로 1715-85 임해자연휴양림",
        "phone": "033-644-9483",
        "closed": ""
    },
    {
        "name": "용화산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0222",
        "address": "강원 춘천시 사북면 사여골길 294",
        "phone": "033-243-9261",
        "closed": "매주 화요일"
    },
    {
        "name": "운문산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0195",
        "address": "경북 청도군 운문면 운문로 763",
        "phone": "054-373-1327",
        "closed": "매주 화요일"
    },
    {
        "name": "운악산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0224",
        "address": "경기 포천시 화현면 화동로 184",
        "phone": "031-534-6330",
        "closed": "매주 화요일"
    },
    {
        "name": "운장산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0194",
        "address": "전북특별자치도 진안군 정천면 휴양림길 77",
        "phone": "063-432-1193",
        "closed": "매주 화요일"
    },
    {
        "name": "용인자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030031",
        "address": "경기 용인시 처인구 모현읍 초부로 220 용인자연휴양림",
        "phone": "031-336-0040",
        "closed": "둘째주 수요일"
    },
    {
        "name": "용지봉 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0302",
        "address": "경남 김해시 대청계곡길 170-36 국립용지봉자연휴양림",
        "phone": "055-326-0133",
        "closed": "매주 화요일"
    },
    {
        "name": "용추자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030047",
        "address": "경남 함양군 안의면 용추휴양림길 260 용추자연휴양림",
        "phone": "055-963-8702",
        "closed": "매주 화요일"
    },
    {
        "name": "용현 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0220",
        "address": "충남 서산시 운산면 마애삼존불길 339",
        "phone": "041-664-1971",
        "closed": "매주 화요일"
    },
    {
        "name": "옥화자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030054",
        "address": "충북 청주시 상당구 미원면 운암옥화길 140 옥화자연휴양림",
        "phone": "043-270-7384",
        "closed": "매주 화요일"
    },
