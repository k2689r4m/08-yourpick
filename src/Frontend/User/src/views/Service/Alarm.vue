<template>
	<div class="container service">
		<div class="section service-top">
			<div class="left">
				<div class="tit">
					<p class="top">내가 고르는 집 과연 안전할까?</p>
					내 집을 고르는 올바른 습관,<br />
					<span class="txt-c--primary">유어픽 안심서비스가</span> 제공합니다.
				</div>
				<div class="con">
					내가 고르는 집 과연 안전할까?<br />
					스스로가 사전에 예방하는 습관을 길러야 합니다.<br />
					<br />
					유어픽은 증가하는 부동산 사기 속,<br />
					사전에 예방할 수 있는 리포트를 제공해드립니다.
				</div>
				<div class="m-block">
					<img src="../../assets/images/service_top_img_mo.png" alt="" />
				</div>
				<div class="btns">
					<button type="button" class="btn btn-google"></button>
					<button type="button" class="btn btn-apple"></button>
				</div>
			</div>
			<div class="right">
				<img src="../../assets/images/service_top_img.png" alt="" />
			</div>
		</div>
		<div class="service-text">
			<div class="tit">우리가 바라던 부동산 서비스</div>
			<div class="con">
				아무도 지켜주지 않습니다.<br />
				내 집, 스스로 지키는 습관을 가져보세요.
				<p class="strong"><span class="txt-c--primary">유어픽 안심서비스</span>가 함께합니다.</p>
			</div>
		</div>
		<div class="service-text bg-black">
			<div class="tit">부동산 거래하기 전,<br />필수로 확인해야하는 리포트.</div>
			<div class="con">
				<p class="strong"><span class="txt-c--primary">어디서도 알려주지 않는 ‘팩트 체크’ 분석</span></p>
			</div>
		</div>
		<div class="section bg-grey">
			<div class="service-tab">
				<button class="btn tab-btn" @click="$btnOnRouter('/report')">안심거래리포트</button>
				<button class="btn tab-btn active" @click="$btnOnRouter('/alarm')">전입신고알리미</button>
			</div>
			<div class="service-con">
				<div class="top">
					<span class="line"><span>누군가 나 몰래?!</span></span>
				</div>
				<div class="tit">전입신고 알리미</div>
				<div class="con">
					서류 조작으로 전입신고를 하여 발생하는 전세 사기! 혹시 우리집 이야기는 아닐까요?<br />
					유어픽 전입신고 알리미로 안전하게 지키세요.
				</div>
				<img src="../../assets/images/service_tablet2.png" class="w-90" alt="" />
			</div>
		</div>
		<div class="section">
			<div class="service-box">
				<div class="tit">전세사기 방지 솔루션</div>
				문서 서류 조작으로 임차인 몰래 전입신고 후 전세사기 행위가<br />
				빈번하게 발생하고 있습니다. <br class="m-block" />(신종 전세사기 수법 사례)<br />
				<br />
				유어픽은 전입신고 변동 서비스를 연동하여 전입신고로 인해 발생하는<br />
				<span class="txt-c--primary">부동산 사기 문제를 방지하고, 임차인을 보호하기 위한</span> 서비스를 제공합니다.
			</div>
			<div class="service-box white">
				<div class="tit">전입신고 변동으로 인해 발생하는 전세사기 유형 예시</div>
				<div class="flex">
					<div class="left">
						<p class="strong">‘허위 전입 · 전출 신고 사기’</p>
						기존에 살고 있던 주택의 세입자를 다른 지역의 집으로 몰래 전입신고 한 뒤 서류상 빈집이 된 세입자 거주 주택을
						담보로 대출을 받습니다.<br />
						이로 인해, <span class="txt-c--primary">세입자는 근저당 설정으로 인한 우선 변제 대항력이 상실</span>됩니다.
					</div>
					<div class="right">
						<img src="../../assets/images/icons/example.svg" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="service-guide">
			<div class="tit">서비스 이용방법</div>
			<div class="sub">누구나 간단하게 이용할 수 있습니다.</div>
			<ul class="list">
				<li class="list-item">
					<div class="icon icon-1">
						<div class="num">1</div>
					</div>
					<div class="tit">회원가입</div>
					<div class="con">알림을 받을 핸드폰 번호 인증이 필요합니다.</div>
				</li>
				<li class="list-item">
					<div class="icon icon-2">
						<div class="num">2</div>
					</div>
					<div class="tit">변동 알림 서비스 신청</div>
					<div class="con">
						신청을 위 필요한 정보들을<br />
						입력해주시기 바랍니다.
					</div>
				</li>
				<li class="list-item">
					<div class="icon icon-3">
						<div class="num">3</div>
					</div>
					<div class="tit">서비스 신청 완료</div>
					<div class="con">
						정상적으로 신청이 완료되면 입력하신 번호로 문자가<br />
						전송되며, 변동이 되었을 경우 안내 문자가 전달됩니다.
					</div>
				</li>
			</ul>
		</div>
		<div class="service-bottom">
			<div class="tit">전입신고 알리미 신청하기</div>
			<button type="button" class="btn btn-primary" @click="$btnOnRouter('/alarm/request')">바로가기</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Alarm',
	components: {},
	computed: {},
	data() {
		return {};
	},

	created() {},
	updated() {},
	methods: {},
};
</script>
