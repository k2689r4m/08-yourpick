<template>
	<div class="container">
		<div class="section">
			<div class="business-my">
				<div class="top">
					<div class="left">
						<div class="img-wrap">
							<img src="" alt="" />
						</div>
						<div class="txt-wrap">
							<div class="name">
								{{ userInfo.name }}
								<button type="button" class="btn">개업공인중개사</button>
							</div>
							<div class="mail">
								{{ userInfo.email }}
								<button type="button" class="btn btn-line white" @click="$btnOnRouter('/business/info')">
									정보수정
								</button>
							</div>
						</div>
					</div>
					<div class="right">
						<div class="business-my--tit">
							보유 중인 상품
							<button type="button" class="btn btn-right" @click="$btnOnRouter('/business/payHistory')">더보기</button>
						</div>
						<!-- 상품없을시 -->
						<!-- <div class="business-my--none">
                        보유한 상품이 없습니다.
                    </div> -->
						<div class="ticket-wrap">
							<div class="tit">패키지 이용권</div>
							<div class="con">
								<div class="num">17</div>
								2023.04.01 까지
							</div>
						</div>
						<div class="ticket-wrap">
							<div class="tit">무료이용권</div>
							<div class="con">
								<div class="num">1</div>
								2023.04.01 까지
							</div>
						</div>
					</div>
				</div>
				<div class="middle">
					<div class="business-my--tit">
						안심거래리포트 발급 현황
						<button type="button" class="btn btn-right" @click="$btnOnRouter('/business/report')">더보기</button>
					</div>
					<!-- 발급현확없을시 -->
					<!-- <div class="business-my--none">
                    발급한 현황이 없습니다.
                </div> -->
					<div class="business-my--list" v-if="historyList.length">
						<button
							class="btn"
							v-for="item in historyList"
							:key="'item_' + item.id"
							@click="openReport(item.id, item.tradeType)"
						>
							{{ item.siNm }} {{ item.sggNm }} {{ item.emdNm }} {{ item.complexName }}
						</button>
					</div>
					<div class="business-my--none" v-else>발급한 현황이 없습니다.</div>
				</div>
				<div class="bottom">
					<div class="left">
						<div class="business-my--tit">
							공지사항
							<button type="button" class="btn btn-right" @click="$btnOnRouter('/center/notice')">더보기</button>
						</div>
						<div class="business-my--list" v-if="noticeList">
							<button
								class="btn"
								v-for="item in noticeList"
								:key="'item2_' + item.id"
								@click="$btnOnRouter('/center/notice', { id: item.id })"
							>
								[공지]
								{{ item.title }}
							</button>
						</div>
						<div class="business-my--none" v-else>등록된 공지가 없습니다.</div>
					</div>
					<div class="right">
						<div class="business-my--tit">
							뉴스
							<button type="button" class="btn btn-right" @click="$btnOnRouter('/center/news')">더보기</button>
						</div>
						<div class="business-my--list" v-if="newsList">
							<button
								class="btn"
								v-for="item in newsList"
								:key="'item3_' + item.id"
								@click="$btnOnRouter('/center/news', { id: item.id })"
							>
								[뉴스] {{ item.title }}
							</button>
						</div>
						<div class="business-my--none" v-else>등록된 뉴스가 없습니다.</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Main',
	components: {},
	computed: {
		...mapGetters({
			userInfo: 'getUserInfo',
		}),
	},
	data() {
		return {
			historyList: '',
			noticeList: '',
			newsList: '',
		};
	},

	created() {
		this.getHistoryList();
		this.getNoticeList();
		this.getNewsList();
	},
	updated() {},
	methods: {
		getHistoryList() {
			this.$apiGET('/api/report/simple').then(data => {
				this.historyList = data;
			});
		},
		getNoticeList() {
			this.$apiGET('/api/noti/simple').then(data => {
				this.noticeList = data.item;
			});
		},
		getNewsList() {
			this.$apiGET('/api/news/simple').then(data => {
				this.newsList = data;
			});
		},
		openReport(id, tradeType) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;
			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			if (tradeType == 'A1') {
				window.open('/result/maemae/' + id, '', attr);
			} else if (tradeType == 'B1') {
				window.open('/result/jeonse/' + id, '', attr);
			} else if (tradeType == 'B2') {
				window.open('/result/monthly/' + id, '', attr);
			}
		},
	},
};
</script>
