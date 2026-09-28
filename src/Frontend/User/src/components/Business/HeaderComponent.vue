<template>
	<div class="header" v-if="$store.getters.getUserInfo.level == 2">
		<div class="left">
			<h1 class="logo business"></h1>
		</div>
		<div class="right">
			<div class="right-menu">
				<button type="button" class="btn">전체메뉴</button>
			</div>
			<div class="user">
				<div class="img-wrap">
					<img src="" alt="" />
				</div>
				홍길동님
			</div>
		</div>
		<div class="dropdown right">
			<div class="dropdown-menu">
				<div class="tit">고객센터</div>
				<button type="button" class="btn" @click="$btnOnRouter('/center/notice')">공지사항</button>
				<button type="button" class="btn" @click="$btnOnRouter('/center/news')">뉴스</button>
			</div>
			<div class="dropdown-menu">
				<div class="tit">상품관리</div>
				<button type="button" class="btn">상품결제</button>
				<button type="button" class="btn">내 이용권</button>
				<button type="button" class="btn">리포트 보관함</button>
			</div>
			<div class="dropdown-menu">
				<div class="tit">마이페이지</div>
				<button type="button" class="btn">내 정보 관리</button>
				<button type="button" class="btn">결제내역</button>
				<button type="button" class="btn">서비스 문의</button>
			</div>
			<div class="dropdown-right">
				<button type="button" class="btn" @click="$btnOnLogin(null)">로그아웃</button>
			</div>
		</div>
	</div>
	<div class="header" v-else>
		<div class="left">
			<h1 class="logo business"></h1>
		</div>
		<div class="right">
			<div class="right-menu">
				<button type="button" class="btn">전체메뉴</button>
			</div>
			<button type="button" class="btn btn-sm btn-line white m-l--30" @click="$btnOnRouter('/business/login')">
				로그인
			</button>
			<button type="button" class="btn btn-sm btn-line white m-l--10" @click="$btnOnRouter('/business/agree')">
				회원가입
			</button>
		</div>
		<div class="dropdown right">
			<div class="dropdown-menu">
				<div class="tit">고객센터</div>
				<button type="button" class="btn" @click="$btnOnRouter('/center/notice')">공지사항</button>
				<button type="button" class="btn" @click="$btnOnRouter('/center/news')">뉴스</button>
			</div>
			<div class="dropdown-menu">
				<div class="tit">상품관리</div>
				<button type="button" class="btn">상품결제</button>
				<button type="button" class="btn">내 이용권</button>
				<button type="button" class="btn">리포트 보관함</button>
			</div>
			<div class="dropdown-menu">
				<div class="tit">마이페이지</div>
				<button type="button" class="btn">내 정보 관리</button>
				<button type="button" class="btn">결제내역</button>
				<button type="button" class="btn">서비스 문의</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HeaderComponent',
	components: {},
	computed: {
		currentRouteName() {
			return this.$route.name;
		},
	},
	data() {
		return {};
	},
	watch: {
		// $route(to, form) {},
	},
	created() {
		window.resultAddress = this.resultAddress;

		// this.$loadScript(
		// 	'https://https://openapi.map.naver.com/openapi/v3/maps.js?clientId=' +
		// 		process.env.VUE_APP_NAVER_API_ID +
		// 		'&submodules=geocoder',
		// )
		// 	.then(() => {})
		// 	.catch(() => {});
	},
	updated() {},
	methods: {
		searchAddress() {
			window.naver.maps.Service.geocode({ address: this.adr }, function (status, re) {
				if (status === window.naver.maps.Service.Status.ERROR) {
					alert('Something wrong!');
					return;
				}
				if (!re.result.total) {
					alert('검색결과가 없습니다.');
					return;
				}

				window.resultAddress(re.v2.addresses[0]);
			});
		},
		resultAddress(item) {
			this.marker?.setMap(null);
			this.jibunAddress = '';
			this.roadAddress = '';
			this.zonecode = null;

			console.log(item);

			if (item.jibunAddress.indexOf(item.addressElements[6].longName) != -1) {
				let str = item.jibunAddress.split(' ');

				for (let i = 0; i < str.length; i++) {
					if (str[i] == item.addressElements[6].longName) {
						str.splice(i, 1);

						item.jibunAddress = str.join(' ');
					}
				}
			}
			item.jibunAddress = item.jibunAddress.replace('서울특별시', '서울시');
			this.jibunAddress = item.jibunAddress;

			if (item.roadAddress.indexOf(item.addressElements[6].longName) != -1) {
				let str = item.roadAddress.split(' ');

				for (let i = 0; i < str.length; i++) {
					if (str[i] == item.addressElements[6].longName) {
						str.splice(i, 1);

						item.roadAddress = str.join(' ');
					}
				}
			}

			item.roadAddress = item.roadAddress.replace('서울특별시', '서울시');
			this.roadAddress = item.roadAddress;

			if (this.roadAddress) {
				this.roadAddress += '(' + item.addressElements[2].longName + ')';
			}

			this.point = { x: item.x, y: item.y };
			this.zonecode = item.addressElements[8].longName == '' ? 0 : Number(item.addressElements[8].longName);

			this.map.setCenter({ lat: this.point.y, lng: this.point.x });

			this.marker = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(this.point.y, this.point.x),
				map: this.map,
			});

			// this.$apiGET(
			// 	'http://api.vworld.kr/req/search?key=CDE0B5E6-CF04-329E-BAF4-98B109A462A6&request=search&type=address&category=parcel&query=군서리 100-32',
			// ).then(re => {
			// 	console.log(re);
			// });
		},
	},
};
</script>
