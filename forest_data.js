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
{
    "name": "와룡자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030084",
            "address": "전북 장수군 천천면 비룡로 632 와룡자연휴양림",
                "phone": "063-350-2477",
                    "closed": ""
},
{
    "name": "용대 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0102",
            "address": "강원 인제군 북면 연화동길 7",
                "phone": "033-462-5031",
                    "closed": "매주 화요일"
},
{
    "name": "용봉산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030080",
            "address": "충남 홍성군 홍북읍 용봉산2길 87 용봉산자연휴양림",
                "phone": "041-630-1785",
                    "closed": ""
},
{
    "name": "오도산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030068",
            "address": "경남 합천군 봉산면 오도산휴양로 345 오도산자연휴양림",
                "phone": "055-930-3742",
                    "closed": "매주 화요일"
},
{
    "name": "오서산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0191",
            "address": "충남 보령시 청라면 오서산길 531",
                "phone": "041-936-5465",
                    "closed": "매주 화요일"
},
{
    "name": "옥성자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030066",
            "address": "경북 구미시 옥성면 휴양림길 150 옥성자연휴양림",
                "phone": "054-480-2080",
                    "closed": "매주 화요일"
},
{
    "name": "옥전자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030110",
            "address": "충북 제천시 봉양읍 옥전길 195",
                "phone": "043-641-6893",
                    "closed": "매주 화요일"
},
{
    "name": "양평쉬자파크",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030079",
            "address": "경기 양평군 양평읍 쉬자파크길 193 양평쉬자파크",
                "phone": "031-770-1009",
                    "closed": "매주 화요일"
},
{
    "name": "여수봉황산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030097",
            "address": "전남 여수시 돌산읍 대복길 160 봉황산자연휴양림",
                "phone": "061-643-9180",
                    "closed": "매주 화요일"
},
{
    "name": "영양에코둥지",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030057",
            "address": "경북 영양군 일월면 재일로 2394-70 영양에코둥지",
                "phone": "054-680-5050",
                    "closed": ""
},
{
    "name": "영인산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030012",
            "address": "충남 아산시 영인면 아산온천로 16-26 영인산 자연휴양림",
                "phone": "041-538-1958",
                    "closed": ""
},
{
    "name": "안면도자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030086",
            "address": "충남 태안군 안면읍 안면대로 3195-6 안면도자연휴양림",
                "phone": "041-674-5019",
                    "closed": ""
},
{
    "name": "양촌자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030034",
            "address": "충남 논산시 양촌면 매죽헌로1723번길 176-23 양촌자연휴양림",
                "phone": "041-746-6481",
                    "closed": ""
},
{
    "name": "양평 백운봉 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030087",
            "address": "경기 양평군 양평읍 약수사길 78-14 양평 백운봉 자연휴양림",
                "phone": "031-775-4005",
                    "closed": "매주 화요일"
},
{
    "name": "양평설매재자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID04030004",
            "address": "경기 양평군 옥천면 용천로 510 설매재자연휴양림",
                "phone": "031-772-5955",
                    "closed": "매주 일요일"
},
{
    "name": "신시도자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0301",
            "address": "전북특별자치도 군산시 옥도면 신시도길 271 신시도자연휴양림",
                "phone": "063-464-5580",
                    "closed": "매주 화요일"
},
{
    "name": "신암저수지 숲속야영장",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030123",
            "address": "경기 양주시 남면 감악산로514번길 242 (남면 신암리 산24-3번지)",
                "phone": "031-8082-6202",
                    "closed": "매주 화요일"
},
{
    "name": "아세안 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0104",
            "address": "경기 양주시 백석읍 기산로 472",
                "phone": "031-871-2796",
                    "closed": "매주 화요일"
},
{
    "name": "안동호반자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030020",
            "address": "경북 안동시 도산면 월천길 100-7 안동호반자연휴양림",
                "phone": "054-855-3371",
                    "closed": "매주 화요일"
},
{
    "name": "수락산 동막골 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030129",
            "address": "서울 노원구 덕릉로145길 108 수락휴",
                "phone": "02-2116-0897",
                    "closed": "매주 화요일"
},
{
    "name": "수레의산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030017",
            "address": "충북 음성군 생극면 차생로 310-108 수레의산자연휴양림",
                "phone": "043-878-2013",
                    "closed": ""
},
{
    "name": "순천자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030058",
            "address": "전남 순천시 서면 청소년수련원길 170 순천자연휴양림",
                "phone": "061-749-8948",
                    "closed": "매주 화요일"
},
{
    "name": "신불산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0105",
            "address": "울산 울주군 상북면 청수골길 175",
                "phone": "052-254-2123",
                    "closed": "매주 화요일"
},
{
    "name": "속리산숲체험휴양마을",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030035",
            "address": "충북 보은군 속리산면 속리산로 596 속리산휴양사업소 속리산숲체험휴양마을",
                "phone": "043-540-3220",
                    "closed": ""
},
{
    "name": "송이밸리자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030049",
            "address": "강원특별자치도 양양군 손양면 고노동길 98-65",
                "phone": "033-670-2644",
                    "closed": ""
},
{
    "name": "송정자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030076",
            "address": "경북 칠곡군 석적읍 반계3길 88 송정자연휴양림",
                "phone": "054-979-6600",
                    "closed": "매주 화요일"
},
{
    "name": "수도산자연휴양림",
        "url": "https://sudosan.foresttrip.go.kr/",
            "address": "경북 김천시 대덕면 증산로 326-71 수도산자연휴양림",
                "phone": "054-421-1646",
                    "closed": ""
},
{
    "name": "성주산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030078",
            "address": "충남 보령시 성주면 화장골길 57-228 성주산자연휴양림",
                "phone": "041-934-7133",
                    "closed": ""
},
{
    "name": "소백산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030009",
            "address": "충북 단양군 영춘면 하리방터길 180 소백산자연휴양림 관리사무소",
                "phone": "043-423-3117",
                    "closed": ""
},
{
    "name": "소선암자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030041",
            "address": "충북 단양군 단성면 대잠2길 15 소선암자연휴양림",
                "phone": "043-422-7839",
                    "closed": ""
},
{
    "name": "속리산 말티재자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0115",
            "address": "충북 보은군 장안면 속리산로 256",
                "phone": "043-543-6282",
                    "closed": "매주 화요일"
},
{
    "name": "석모도자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030071",
            "address": "인천 강화군 삼산면 삼산서로 39-75 (1차휴양관) , 강화군 삼산면 석모리산 154-1 (2차 숲속의집)",
                "phone": "032-932-1100",
                    "closed": ""
},
{
    "name": "성불산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030070",
            "address": "충북 괴산군 괴산읍 충민로기곡길 78 성불산자연휴양림",
                "phone": "043-830-2679",
                    "closed": ""
},
{
    "name": "성수산왕의숲자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030122",
            "address": "전북특별자치도 임실군 성수면 성수리 21",
                "phone": "063-643-4683",
                    "closed": "매주 화요일"
},
{
    "name": "성주봉자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030039",
            "address": "경북 상주시 은척면 성주봉로 3 성주봉자연휴양림",
                "phone": "054-541-6512",
                    "closed": "매주 화요일"
},
{
    "name": "상당산성 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0300",
            "address": "충북 청주시 청원구 내수읍 덕암2길 162",
                "phone": "043-216-0052",
                    "closed": "매주 화요일"
},
{
    "name": "생거진천자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030033",
            "address": "충북 진천군 백곡면 명암길 435-135 생거진천자연휴양림",
                "phone": "043-539-3554",
                    "closed": "매주 화요일"
},
{
    "name": "서귀포자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030013",
            "address": "제주특별자치도 서귀포시 1100로 882 서귀포 자연휴양림",
                "phone": "064-738-4544",
                    "closed": ""
},
{
    "name": "서운산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030092",
            "address": "경기 안성시 금광면 배티로 185-39 서운산자연휴양림",
                "phone": "031-678-2913",
                    "closed": "매주 화요일"
},
{
    "name": "산음 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0103",
            "address": "경기 양평군 단월면 고북길 347",
                "phone": "031-774-8133",
                    "closed": "매주 화요일"
},
{
    "name": "산청한방자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030037",
            "address": "경남 산청군 금서면 동의보감로555번길 186 산청한방자연휴양림",
                "phone": "055-970-6951",
                    "closed": ""
},
{
    "name": "삼봉 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0107",
            "address": "강원 홍천군 내면 삼봉휴양길 276",
                "phone": "033-435-8536",
                    "closed": "매주 화요일"
},
{
    "name": "삼척활기자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030104",
            "address": "강원 삼척시 미로면 준경길 651-59 삼척활기자연휴양림",
                "phone": "033-574-0032",
                    "closed": ""
},
{
    "name": "비학산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030052",
            "address": "경북 포항시 북구 기북면 비학산길 302 비학산자연휴양림",
                "phone": "054-252-3275",
                    "closed": ""
},
{
    "name": "사천 케이블카 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030112",
            "address": "경남 사천시 실안길 242-45 (실안동 3-4)",
                "phone": "055-835-9524",
                    "closed": "매주 화요일"
},
{
    "name": "산삼자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030048",
            "address": "경남 함양군 서상면 가르내길 202-1 산삼자연휴양림",
                "phone": "055-964-9886",
                    "closed": "매주 화요일"
},
{
    "name": "산수유자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030091",
            "address": "전남 구례군 산동면 정산길 251 산수유자연휴양림",
                "phone": "061-783-1002",
                    "closed": ""
},
{
    "name": "봉수산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030028",
            "address": "충남 예산군 대흥면 임존성길 153 봉수산자연휴양림",
                "phone": "041-339-8936",
                    "closed": ""
},
{
    "name": "봉황자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030051",
            "address": "충북 충주시 중앙탑면 수룡봉황길 540 봉황자연휴양림",
                "phone": "043-830-9360",
                    "closed": "매주 월요일"
},
{
    "name": "붉은오름자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030014",
            "address": "",
                "phone": "",
                    "closed": ""
},
{
    "name": "비슬산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030093",
            "address": "대구 달성군 유가읍 일연선사길 61 비슬산자연휴양림",
                "phone": "053-659-4400",
                    "closed": "매주 화요일"
},
{
    "name": "백운산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0223",
            "address": "강원 원주시 판부면 백운산길 81",
                "phone": "033-766-1063",
                    "closed": "매주 화요일"
},
{
    "name": "변산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0189",
            "address": "전북특별자치도 부안군 변산면 변산로 3768",
                "phone": "063-581-9977",
                    "closed": "매주 화요일"
},
{
    "name": "보현산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030105",
            "address": "경북 영천시 화북면 배나무정길 334 보현산자연휴양림",
                "phone": "054-336-6618",
                    "closed": "매주 수요일"
},
{
    "name": "복주산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0110",
            "address": "강원 철원군 근남면 하오재로 818",
                "phone": "033-458-9426",
                    "closed": "매주 화요일"
},
{
    "name": "방태산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0109",
            "address": "강원 인제군 기린면 방태산길 241",
                "phone": "033-463-8590",
                    "closed": "매주 화요일"
},
{
    "name": "방화동자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030082",
            "address": "전북 장수군 번암면 방화동로 778 방화동자연휴양림",
                "phone": "063-350-2474",
                    "closed": ""
},
{
    "name": "백아산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030098",
            "address": "전남 화순군 백아면 수양로 353 백아산자연휴양림",
                "phone": "061-379-3737",
                    "closed": ""
},
{
    "name": "백야자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030016",
            "address": "충북 음성군 금왕읍 백야로 461-97 백야자연휴양림",
                "phone": "043-871-5922",
                    "closed": ""
},
{
    "name": "민주지산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030107",
            "address": "충북 영동군 용화면 휴양림길 60 민주지산자연휴양림",
                "phone": "043-740-3437",
                    "closed": ""
},
{
    "name": "밀양 도래재자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030115",
            "address": "경남 밀양시 단장면 도래재로 462 밀양 도래재자연휴양림",
                "phone": "055-355-0200",
                    "closed": "매주 화요일"
},
{
    "name": "박달재자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030062",
            "address": "충북 제천시 백운면 금봉로 223 박달재자연휴양림",
                "phone": "043-652-0910",
                    "closed": "매주 화요일"
},
{
    "name": "방장산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0181",
            "address": "전남 장성군 북이면 방장로 353",
                "phone": "061-394-5523",
                    "closed": "매주 화요일"
},
{
    "name": "문성자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030055",
            "address": "충북 충주시 노은면 우성1길 191 문성자연휴양림",
                "phone": "043-830-9341",
                    "closed": "매주 월요일"
},
{
    "name": "문수산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030102",
            "address": "경북 봉화군 봉성면 시거리길 378 문수산자연휴양림",
                "phone": "054-674-3700",
                    "closed": "매주 월요일"
},
{
    "name": "미숭산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030026",
            "address": "경북 고령군 대가야읍 낫질로 672-99 미숭산자연휴양림",
                "phone": "054-950-7407",
                    "closed": "매주 화요일"
},
{
    "name": "미천골 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0112",
            "address": "강원 양양군 서면 미천골길 115",
                "phone": "033-673-1806",
                    "closed": "매주 화요일"
},
{
    "name": "무등산편백자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID04030010",
            "address": "전남 화순군 이서면 안양산로 685 무등산편백자연휴양림",
                "phone": "061-373-2065",
                    "closed": ""
},
{
    "name": "무봉산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030118",
            "address": "경기 화성시 동탄순환대로24길 185",
                "phone": "031-373-1162",
                    "closed": ""
},
{
    "name": "무의도 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0303",
            "address": "인천 중구 하나개로 74",
                "phone": "032-751-0426",
                    "closed": "매주 화요일"
},
{
    "name": "무주향로산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030108",
            "address": "전북 무주군 무주읍 무학로 153-36 무주향로산자연휴양림",
                "phone": "063-322-6884",
                    "closed": ""
},
{
    "name": "두타산 자연휴양림(평창)",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0243",
            "address": "강원 평창군 진부면 아차골길 132",
                "phone": "033-334-8815",
                    "closed": "매주 화요일"
},
{
    "name": "만수산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030007",
            "address": "충남 부여군 외산면 휴양로 107 삼산리 산 40번지 만수산 자연휴양림",
                "phone": "041-832-6561",
                    "closed": ""
},
{
    "name": "만인산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030111",
            "address": "대전 동구 산내로 106",
                "phone": "042-270-8651",
                    "closed": ""
},
{
    "name": "망경대산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030067",
            "address": "강원특별자치도 영월군 산솔면 선도우길 177 망경대산자연휴양림",
                "phone": "033-375-8765",
                    "closed": ""
},
{
    "name": "덕적도 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030127",
            "address": "인천 옹진군 덕적면 덕적남로 220",
                "phone": "032-899-2860",
                    "closed": "넷째주 화요일"
},
{
    "name": "데미샘자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030074",
            "address": "전북특별자치도 진안군 백운면 데미샘1길 172 데미샘자연휴양림",
                "phone": "063-290-6993",
                    "closed": ""
},
{
    "name": "독용산성자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030004",
            "address": "경북 성주군 금수강산면 사더래길 144",
                "phone": "054-930-8401",
                    "closed": "매주 화요일"
},
{
    "name": "동두천자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030023",
            "address": "경기 동두천시 탑동가산로 1 동두천자연휴양림",
                "phone": "031-865-6003",
                    "closed": "매주 월요일"
},
{
    "name": "대야산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0245",
            "address": "경북 문경시 가은읍 용추길 31-35",
                "phone": "054-571-7181",
                    "closed": "매주 화요일"
},
{
    "name": "대운산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030038",
            "address": "경남 양산시 탑골길 270 대운산자연휴양림",
                "phone": "055-379-8670",
                    "closed": "매주 화요일"
},
{
    "name": "덕원자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID04030008",
            "address": "경남 하동군 옥종면 종화리 산 66 덕원자연휴양림",
                "phone": "055-884-0650",
                    "closed": "매주 화요일"
},
{
    "name": "덕유산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0141",
            "address": "전북특별자치도 무주군 무풍면 구천동로 530-62",
                "phone": "063-322-1097",
                    "closed": "매주 화요일"
},
{
    "name": "달음산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0202",
            "address": "부산 기장군 일광면 화용길 299-106",
                "phone": "051-722-3023",
                    "closed": "매주 화요일"
},
{
    "name": "대관령 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0111",
            "address": "강원 강릉시 성산면 삼포암길 133",
                "phone": "033-641-9990",
                    "closed": "매주 화요일"
},
{
    "name": "대봉산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030046",
            "address": "경남 함양군 병곡면 병곡지곡로 333 대봉산자연휴양림",
                "phone": "055-964-1090",
                    "closed": "매주 화요일"
},
{
    "name": "대봉캠핑랜드",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030117",
            "address": "경남 함양군 병곡면 원산지소길 192 대봉캠핑랜드",
                "phone": "055-963-2026",
                    "closed": "매주 화요일"
},
{
    "name": "김천숲속야영장",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0304",
            "address": "경북 김천시 대덕면 조룡길 865 김천숲속야영장",
                "phone": "054-435-7257",
                    "closed": "매주 화요일"
},
{
    "name": "낙안민속 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0200",
            "address": "전남 순천시 낙안면 민속마을길 1600",
                "phone": "061-754-4400",
                    "closed": "매주 화요일"
},
{
    "name": "남원자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID04030003",
            "address": "전북 남원시 보산로 228 남원자연휴양림",
                "phone": "063-633-5333",
                    "closed": "매주 수요일"
},
{
    "name": "남해편백 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0192",
            "address": "경남 남해군 삼동면 금암로 658",
                "phone": "055-867-7881",
                    "closed": "매주 화요일"
},
{
    "name": "금산산림문화타운(남이자연휴양림)",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030063",
            "address": "충남 금산군 남이면 느티골길 200 (건천리 470-1) 금산산림문화타운(남이자연휴양림)",
                "phone": "041-753-5706",
                    "closed": "매주 화요일"
},
{
    "name": "금원산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030077",
            "address": "경남 거창군 위천면 금원산길 412 금원산자연휴양림",
                "phone": "055-254-3971",
                    "closed": ""
},
{
    "name": "기찬자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030121",
            "address": "전남 영암군 미암면 미암리 산 48-1",
                "phone": "061-470-2735",
                    "closed": "매주 화요일"
},
{
    "name": "김제 선암자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030119",
            "address": "전북 김제시 금구면 월전로 299",
                "phone": "063-540-6141",
                    "closed": "매주 화요일"
},
{
    "name": "구재봉자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030072",
            "address": "경남 하동군 적량면 중서길 60-81 구재봉자연휴양림",
                "phone": "070-8855-8011",
                    "closed": "매주 화요일"
},
{
    "name": "군위장곡자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030064",
            "address": "대구 군위군 삼국유사면 장곡휴양림길 195 장곡자연휴양림",
                "phone": "054-380-6317",
                    "closed": "매주 화요일"
},
{
    "name": "금봉자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030075",
            "address": "경북 의성군 옥산면 휴양림길 114 금봉자연휴양림",
                "phone": "054-833-0123",
                    "closed": ""
},
{
    "name": "금산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0305",
            "address": "충남 금산군 남이면 거북바위길 10-163",
                "phone": "041-754-0102",
                    "closed": "매주 화요일"
},
{
    "name": "광양백운산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030061",
            "address": "전남 광양시 옥룡면 백계로 337 백운산자연휴양림",
                "phone": "061-797-2655",
                    "closed": ""
},
{
    "name": "광치자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030095",
            "address": "강원특별자치도 양구군 국토정중앙면 광치령로1794번길 265 광치자연휴양림",
                "phone": "033-482-3115",
                    "closed": ""
},
{
    "name": "교래자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030056",
            "address": "제주특별자치도 제주시 조천읍 남조로 2023 교래자연휴양림",
                "phone": "064-710-7475",
                    "closed": ""
},
{
    "name": "구수곡자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030073",
            "address": "경북 울진군 북면 십이령로 2721 구수곡자연휴양림",
                "phone": "054-783-2241",
                    "closed": "매주 화요일"
},
{
    "name": "계명산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030042",
            "address": "충북 충주시 충주호수로 1170 계명산자연휴양림",
                "phone": "043-830-9350",
                    "closed": "매주 월요일"
},
{
    "name": "고대산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030001",
            "address": "경기 연천군 신서면 고대산길 84-79 고대산자연휴양림",
                "phone": "031-834-2200",
                    "closed": "넷째주 화요일"
},
{
    "name": "고산자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030025",
            "address": "전북 완주군 고산면 고산휴양림로 246 고산자연휴양림",
                "phone": "063-263-8680",
                    "closed": "매주 화요일"
},
{
    "name": "공주산림휴양마을",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030011",
            "address": "충남 공주시 수원지공원길 222",
                "phone": "041-855-0855",
                    "closed": ""
},
{
    "name": "거창산림레포츠파크",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030126",
            "address": "경남 거창군 고제면 빼재로 2099-35",
                "phone": "055-943-9026",
                    "closed": ""
},
{
    "name": "거창항노화힐링랜드",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030109",
            "address": "경남 거창군 가조면 의상봉길 834 거창항노화힐링랜드",
                "phone": "055-940-7930",
                    "closed": "매주 화요일"
},
{
    "name": "검마산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0184",
            "address": "경북 영양군 수비면 검마산길 191",
                "phone": "054-682-9009",
                    "closed": "매주 화요일"
},
{
    "name": "검봉산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0244",
            "address": "강원 삼척시 원덕읍 임원안길 525-145",
                "phone": "033-574-2553",
                    "closed": "매주 화요일"
},
{
    "name": "강원숲체험장",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030096",
            "address": "강원 춘천시 서면 납실길 107-64 강원숲체험장",
                "phone": "033-248-6600",
                    "closed": "매주 화요일"
},
{
    "name": "강화자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID04030105",
            "address": "인천 강화군 불은면 중앙로 546-34",
                "phone": "032-937-7482",
                    "closed": "매주 화요일"
},
{
    "name": "갯골자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030120",
            "address": "강원특별자치도 인제군 인제읍 인제로103번길 501 갯골자연휴양림",
                "phone": "033-463-3511",
                    "closed": ""
},
{
    "name": "거제자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030059",
            "address": "경남 거제시 동부면 거제중앙로 325 거제자연휴양림",
                "phone": "055-639-8331",
                    "closed": "매주 화요일"
},
{
    "name": "가리산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030002",
            "address": "강원 홍천군 두촌면 가리산길 426 천현리 산 134-1",
                "phone": "033-435-6034",
                    "closed": ""
},
{
    "name": "가리왕산 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=0113",
            "address": "강원 정선군 정선읍 가리왕산로 791",
                "phone": "033-562-5833",
                    "closed": "매주 화요일"
},
{
    "name": "갈모봉 자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030124",
            "address": "경남 고성군 고성읍 갈모봉숲길 42 갈모봉 자연휴양림",
                "phone": "055-670-5953",
                    "closed": "매주 화요일"
},
{
    "name": "강씨봉자연휴양림",
        "url": "https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030019",
            "address": "경기 가평군 북면 논남기길 520 강씨봉자연휴양림",
                "phone": "031-8008-6611",
                    "closed": "매주 화요일"
}
];

export default forestData;
